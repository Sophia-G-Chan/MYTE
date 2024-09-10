# Journey Tasks - Sophia Chan Capstone Project

## Overview

JourneyTask is a task management app that combines time planning with your to-do list. Unlike regular to-do lists, JourneyTask allows you to assign time estimates for tasks and seamlessly add them to your calendar. The app emphasizes the importance of the process over the outcome, highlighting that every step is part of the journey.


### Problem Space

Why is your app needed? Give any background information around any pain points or other reasons.

I have found that when I make a to do list there is either an extra step to go from the to do list to the calendar. The goal is that on one page you can make your to do list and then also still see your calendar.

The problem is that when you use Outlook or Google tasks they do not let you account for time to put into your calendar doing those tasks. Example of others having this problem https://answers.microsoft.com/en-us/msoffice/forum/all/how-can-i-integrate-the-to-do-tasks-into-the/9ba1819a-40e6-42da-9805-8f99a3cb0deb

The second issue is that if you only use the calendar for your to do items is when you are scheduled for a meeting the time for that tasks is now lost so eventually this app will use AI to shift the tasks 'down' to the next available time and push all other tasks back.

As a user you may find your self either loosing paper to do lists, not finding enough time to get your tasks done or just not getting your to do items done. JourneyTasks is designed to help the user manage their day so that a realistic expectation of what can be done in a day. For example if you make a to do list for 10 items today but have 5 meetings (30 min each) and each task takes 1 hour then you are not realisticly going to complete your tasks

### User Profile

Who will use your app? How will they use it? Add any special considerations that your app must take into account.

People that like to make to do lists.

Pros:
- you can access your todo list from anywhere
-

### Features

List the functionality that your app will include. These can be written as user stories or descriptions with related details. Do not describe _how_ these features are implemented, only _what_ needs to be implemented.
- As a user I want to be able to...

## Implementation
1. Basic components
    - Routes
2. Create Database
    - login/users (nice to have)
    - Goal (nice to have)
    - To Do List (MVP)
    - Calendar?

3. Import Calendar APIs
    - Google Calendar (MVP)
    - Outlook

4. Create Express Server to save, read, delete to do list

5. Accessibility pop up
    - Theme
    - Customize font size (toggle between small, medium, large)
    - Font family switch to dyslexia
    - Contrast view (black with neon font)
    - accessible button moves anywhere on the screen


### Tech Stack

List technologies that will be used in your app, including any libraries to save time or provide more functionality. Be sure to research any potential limitations.

- client libraries
    - react
    - react-router-dom
    - axios
    - react-google-calendar
    - react-week-calendar
    - react-calendar
    - tailwindscss

- servers libraries
    - knex
    - express
    - bycrypt for password hashing

### APIs

List any external sources of data that will be used in your app.

### Sitemap

List the pages of your app with brief descriptions. You can show this visually, or write it out.

### Mockups

Provide visuals of your app's screens. You can use pictures of hand-drawn sketches, or wireframing tools like Figma.

### Data

Describe your data and the relationships between the data points. You can show this visually using diagrams, or write it out.

### Endpoints

List endpoints that your server will implement, including HTTP methods, parameters, and example responses.

## Roadmap

Scope your project as a sprint. Break down the tasks that will need to be completed and map out timeframes for implementation working back from the capstone due date.

---

## Future Implementations
Your project will be marked based on what you committed to in the above document. Here, you can list any additional features you may complete after the MVP of your application is built, or if you have extra time before the Capstone due date.

- Additional pages/widgest
    - weather
    - pomodor timer
    - sorting to do list based on Eisenhower Matrix (Urgent/Important, Not Urgent/important, Urgent/Unimportant, Not Urgent/Unimportant)
    - Goals/ sub items/bigger goal relationships so that this can be used to visualize the journey to completing goals/large tasks
    - Accesibilty toggle add-ons:
        - Customize colors to user preference
        - Blidness
        - Visually impaired
        - motor skill disorders
        - colour blindness
        - Epilepsy
        - ADHD
        - Learning
        - Elder

    - Utilize AI to help reschedule tasks to the next open slot - would need to shift all other tasks
-   Energy tracker/data tracker of what you do ~ helps improve efficency when you know what time of day you have more/less energy
- Provide suggestions on duration based on past feedback about how long tasks have taken to complete.
- Eventually this could be used by employers to better understand where bottlenecks are or where their employees are getting bogged down (such as meetings)
