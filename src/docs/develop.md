## Introduction
[Lutece](https://github.com/lutece-awesome) is a fast iterative developing Online Judge platform, the Dev team still bring many amazing features on it, as open source project, you can also join the building of this 👏awesome project, this simple doc would guide you:
- Architecture introduction
- How to run dev server in localhost
- Dev environment
- How to submit PR to Lutece? 😎
## Part 1 - Architecture introduction
There are three mainly parts of Lutece:
* [Frontend](https://github.com/lutece-awesome/lutece-frontend)(Interact with user)
    + [Vue.js](https://vuejs.org/) as Javascript framework.
    + [Vuetify](https://vuetifyjs.com/en/) as UI framework.
* [Backend](https://github.com/lutece-awesome/lutece-backend)(Business logic and database processing)
    + [Django](https://www.djangoproject.com/): Server framework with magic Python.
    + [Celery](http://www.celeryproject.org/): Distributed task queue framework.
* [JudgeCore](https://github.com/lutece-awesome/osiris)(User submission judging)
    + [Docker](https://www.docker.com/): Sandbox solution.
    + [cgroups](https://en.wikipedia.org/wiki/Cgroups): (Still WIP)Runtime resources limitation.

Lutece use the [GraphQL](https://graphql.org/) query language to process the data exchange between the server and client, for this, the client use [VueApollo](https://vue-apollo.netlify.com/) framework and server use [Graphene](https://graphene-python.org/) framework.Please attentain that this only list the most important frameworks using in Lutece, but still others.
## Part 2 - How to run dev server in localhost
To easy start, we do not consider run local judge osiris core.

Run dev frontend server in localhost is quite easy, please follow the [README](https://github.com/lutece-awesome/lutece-frontend/blob/master/README.md).

Run dev backend server is more complexity, please follow these steps:
+ pip3 install -r requirements/requirements.txt
+ cp Lutece/config.py.tempalte Lutece/config.py
+ [make migrations](https://github.com/lutece-awesome/lutece-backend/blob/master/.travis.yml#L23)
+ [migrate](https://github.com/lutece-awesome/lutece-backend/blob/master/.travis.yml#L24)
+ python3 manage.py runserver
## Part 3 - Dev environment
Frontend:
+ Use [VSCode](https://code.visualstudio.com/).

Backend:
+ Use [Pycharm](https://www.jetbrains.com/pycharm/) professional version(if you are student, you can apply [student license](https://www.jetbrains.com/student/)).
## Part 4 - How to submit PR
Please follow the github PR [guide](https://help.github.com/articles/creating-a-pull-request/).

And for all PRs, please specify [lutece-awesome/review](https://github.com/orgs/lutece-awesome/teams/review/members) as [reviewers](https://help.github.com/articles/requesting-a-pull-request-review/).

As osiris core planning to entire refactor, so any PRs to osiris would not be accepted for now.