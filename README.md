# Todo App - Called "Todo" btw
The infamous "todo app" is a very simple project, but I decided to make a bit more complex by connecting a self hoted postgresql database to it as well.
The interface is extremly minimal as my focus was more on the backend rather than the frontend. Of course, it doesn't mean that most of the work went to backend (I think that
even though my focus was on the backend to learn postgres I still spent more time on the frontend).

### The backend
My main focus for this project was to learn postgres and nodejs, and I decided that the best way to do it is to selh host a postgres database.
After setting up the database and learning a few lines of postgresql code, I had to decide for a backend programming language to communicate with the server.
I chose nodejs for two reasons: one, I already knew javascript and two, because node is used quite often in the industry.
Aside from postgres and nodejs I used postman as well for testing my endpoints.

After learning a bit about postman and nodejs I had to decide how to authenticate the users. I stopped at a common method, the token based authentication. It was quite challanging, but after
understanding it more deeply I made it work. After that all I had to do was to create 3 endpoints for projects, statuses and todos (create, edit, delete) and of course a session one which
weren't so hard after building the authentication part.

### The frontend
As I said the main goal for this project was to learn backend, but I still had to do the frontend.
For frontend I decided to go with something more or less new: the tanstack router. Along with it I used react query, tailwindcss, shadcn, typescript, zod and framer motion.
