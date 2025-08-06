# Simple To-Do List

Simple To-Do app generated with Qodo Gen.

## Manual Testing Checklist

| Functionality              | Expected Outcome                               | Status + Description                                                                 |
|---------------------------|------------------------------------------------|--------------------------------------------------------------------------------------|
| `Add new task`            | `Task appears in list`                         | ✅ Valid                                                                              |
| `Mark task as complete`   | `Task gets visually marked + strike-through`   | ✅ Valid                                                                              |
| `Delete task`             | `Task disappears from list`                    | ✅ Valid                                                                              |
| `Page reload`             | `Tasks persist`                                | ✅ Valid (added localStorage support)                                                |
| `Empty input validation`  | `Empty tasks not allowed`                      | ✅ Valid – empty and "SPACE" not allowed                                             |
| `Max input validation`    | `Max 250 characters allowed per task`          | ✅ Valid – shows error; cannot exceed via typing or pasting                          |
| `UI is mobile-friendly`   | `Dynamic when screen resolution changes`       | ✅ Valid                                                                              |
| `UI smoothness`           | `No visible bugs, user-friendly`               | ⚠️ Could improve: make textbox auto-grow, align toggle icon with button, refine edit/delete buttons |
| `Other`                   | `No unexpected behaviors`                      | ✅ Valid - No unexpected behaviors found                                                                         |

## Screenshots

![App Screenshot](https://raw.githubusercontent.com/ennagrigor/qodo-todo-app/refs/heads/main/app-screen-shots/Dark_Empty_List.png)
![App Screenshot](https://raw.githubusercontent.com/ennagrigor/qodo-todo-app/refs/heads/main/app-screen-shots/Dark_With_Items.png)
![App Screenshot](https://raw.githubusercontent.com/ennagrigor/qodo-todo-app/refs/heads/main/app-screen-shots/Light_With_Items.png)
![App Screenshot](https://raw.githubusercontent.com/ennagrigor/qodo-todo-app/refs/heads/main/app-screen-shots/Ligth_Empty_List.png)
