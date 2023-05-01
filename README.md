# Selection Task Refactoring Project

## Table of Contents

1. [프로젝트 소개](#1-프로젝트-소개)
   1-1. [About this project](#1-1-about-this-project)
   1-2. [진행 기간](#1-2-진행-기간)
   1-3. [프로젝트 원본 저장소](#1-3-프로젝트-원본-저장소)

2. [Best Practice 선정 근거](#2-Best-Practice-선정-근거)
   2-1. [최신 데이터를 유지하는 refetch 로직 구현](#2-1-최신-데이터를-유지하는-refetch-로직-구현)
   2-2. [Custom Hook을 통한 관심사의 분리](#2-2-custom-hook을-통한-관심사의-분리)
   2-3. [렌더링 최적화 적용](#2-3-렌더링-최적화-적용)
   2-4. [관계성이 파악되는 컴포넌트 위치](#2-4-관계성이-파악되는-컴포넌트-위치)
   <br />

## 1. 프로젝트 소개

![Selection Task Refactoring Banner](https://user-images.githubusercontent.com/85419343/235454153-e58b31c1-4c82-422a-af5d-668c1470672f.png)

### 1-1. About this project

- 이 프로젝트는 [원티드](https://www.wanted.co.kr/)에서 주관하는 **프론트엔드 인턴십 프로그램**에 선발되기 위해 수행한 사전 과제입니다.
  - 해당 프로그램에 선발된 후, **선발 과제를 더 나은 코드로 Refactoring**하는 과제가 첫 번째로 주어졌습니다.
  - 7명의 팀원들이 자신의 과제를 각자 개선한 후, **어떤 부분을 개선했는지에 Pull Request**를 보내고 **코드 리뷰를 하며 토론**했습니다.
  - 7명의 코드 중 **가장 좋은 코드를 근거와 함께 Best Practice로 선출**하였으며, 저의 코드가 Best Practice로 선정되었습니다.

### 1-2. 진행 기간

- 2023.2.21 ~ 2.24 (4일)

### 1-3. 프로젝트 원본 저장소

- 7명의 팀원들과 함께 협업의 기록이 있는 [GitHub Repository](https://github.com/wanted-pre-onboarding-team5/pre-onboarding-9th-1-5) 입니다.
- 요구 사항을 정리한 [Issue](https://github.com/wanted-pre-onboarding-team5/pre-onboarding-9th-1-5/issues?q=is%3Aissue+is%3Aclosed), 코드 리뷰의 기록이 있는 [Pull Request](https://github.com/wanted-pre-onboarding-team5/pre-onboarding-9th-1-5/pulls)를 확인하실 수 있습니다.

<br />

## 2. Best Practice 선정 근거

> 아래의 이유를 근거로, 팀원들과 토론 후 저의 코드가 **Best Practice**로 선정되었습니다.

### 2-1. 최신 데이터를 유지하는 refetch 로직 구현

- 서버의 데이터가 변경되었을 때, 즉시 클라이언트의 화면을 변경시켜 화면에 최신 데이터를 보여줄 수 있도록 로직을 구현했습니다.

```js
// pages/Todo/useTodo.jsx
export const useTodo = () => {
  const { data: loadedTodoData } = useLoaderData();
  const [todos, setTodos] = useState(loadedTodoData);
  const [isUpdated, setIsUpdated] = useState(false);
  const { value: todoValue, onReset: resetTodo, onChange: onTodoChange } = useInput();

  const refetchTodos = async () => {
    try {
      const { data: refetchedTodos } = await getTodos();
      setTodos(refetchedTodos);
      setIsUpdated(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    refetchTodos();
  }, [isUpdated]);

  const handleCreateTodo = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        if (validator.checkTodo(todoValue)) {
          await createTodo({ todo: todoValue });
          setIsUpdated(true);
          resetTodo();
        }
      } catch (error) {
        console.error(error);
      }
    },
    [todoValue],
  );

```

- 새로운 Todo 아이템을 생성 후, 생성된 Todo 아이템을 포함한 데이터를 다시 받아오기 위해 요청을 보내는 `refetchTodos` 함수를 구현했습니다.
- `isUpdated`를 flag 상태 변수로 두고, 이것을 `useEffect` hook의 dependency 배열에 넣었습니다.
  - 따라서 `isUpdated`의 상태가 변경되면 `refetchTodos` 함수가 다시 호출되고, 새롭게 받아 온 데이터를 `todos` 상태 변수에 저장합니다.
- 이러한 방식을 통해, 서버의 데이터와 클라이언트의 데이터를 동기화하여 화면에 최신 데이터를 보여줄 수 있습니다.

### 2-2. Custom Hook을 통한 관심사의 분리

- `Todo` 페이지 컴포넌트와 `TodoItem` 컴포넌트의 비즈니스 로직을 UI 로직과 분리하기 위해 Custom Hook으로 분리했습니다.
- 이 Hook들을 기존에 있던 `hooks` 폴더에 위치시킬 수도 있었지만, 관련 있는 코드들은 가깝게 위치하도록 응집도를 높이기 위해 해당 컴포넌트 폴더에 위치시켰습니다.
- 결과적으로 다음과 같이 Hook을 배치하였습니다.
  - `hooks` 폴더 : 다른 컴포넌트에서도 공통적으로 사용할 수 있는 Custom Hooks
  - 컴포넌트 폴더 : 다른 컴포넌트에서 재사용하기 위한 목적이 아닌, 비즈니스 로직을 분리하기 위해 만든 Custom Hooks

```
📦src
 ┣ 📂apis
 ┣ 📂components
 ┃ ┗ 📂TodoList
 ┃ ┃ ┣ 📂TodoItem
 ┃ ┃ ┃ ┣ 📜index.jsx
 ┃ ┃ ┃ ┗ 📜useTodoItem.jsx # 비즈니스 로직을 분리하기 위한 용도의 Custom Hook
 ┣ 📂constants
 ┃ ┣ 📜index.js
 ┃ ┣ 📜path.js
 ┃ ┗ 📜storage.js
 ┣ 📂hooks # 다른 컴포넌트에서 공통적으로 사용될 수 있는 Custom Hooks
 ┃ ┣ 📜useAuthForm.jsx
 ┃ ┣ 📜useInput.jsx
 ┃ ┗ 📜useMovePage.jsx
 ┣ 📂pages
 ┃ ┣ 📂Error
 ┃ ┣ 📂Root
 ┃ ┣ 📂SignIn
 ┃ ┣ 📂SignUp
 ┃ ┣ 📂Todo
 ┃ ┃ ┣ 📜index.jsx
 ┃ ┃ ┗ 📜useTodo.jsx # 비즈니스 로직을 분리하기 위한 용도의 Custom Hook
 ┣ 📂router
 ┃ ┣ 📂loaders
 ┣ 📂utils
 ┣ 📜App.jsx
 ┗ 📜index.js
```

### 2-3. 렌더링 최적화 적용

- React의 `memo`와 `useCallback` Hook을 활용해 컴포넌트의 리렌더링을 횟수를 줄이는 최적화를 적용했습니다.
- `input`에 글자 입력 시 Todo List까지 리렌더링이 되었는데, 불필요한 렌더링이기 때문에 리렌더링이 발생하지 않도록 최적화했습니다.

#### Before

![TodoList 최적화 전](https://user-images.githubusercontent.com/85419343/220948626-d844a261-3a95-40b8-b804-7b72554b1dd4.gif)

#### After

![TodoList 최적화 후](https://user-images.githubusercontent.com/85419343/220948650-3b3fa776-8698-493a-8cb3-ce2a2127b6ec.gif)

### 2-4. 관계성이 파악되는 컴포넌트 위치

```
📦src
 ┣ 📂apis
 ┣ 📂components
 ┃ ┗ 📂TodoList
 ┃ ┃ ┣ 📂TodoItem
...
```

- 기존에는 `components` 폴더 하위에 `TodoItem` 컴포넌트와 `TodoList` 컴포넌트가 같은 depth에 있었습니다.
- `TodoItem` 컴포넌트는 오로지 `TodoList` 컴포넌트에서만 사용되는 하위 컴포넌트이기 때문에, 이 둘이 컴포넌트라고 해도 같은 depth에 위치시키는 것보다는 관계성을 표현하도록 위치시키는 것이 더 좋은 구조라고 생각했습니다.
- 이렇게 컴포넌트의 관계성이 잘 나타나도록 위치시키면, 협업하는 다른 개발자들도 컴포넌트가 어디에 속해있는지 파악하기 쉬워지고, 코드를 이해하고 유지보수하기 쉬운 구조가 됩니다.

<br />
