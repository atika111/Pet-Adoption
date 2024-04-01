- [] **Full Stack Project**
- [] **Pet Adoption Platform**

---

**Summary**

In this project, you will build a full stack pet adoption platform, with search, user/adoption management & admin dashboard. The goal of this platform is to allow users to sign up, search, and adopt pets.

Below you have a list of pages and their components that will need to be implemented. In this document, you will find all the information you will need to complete the frontend portion of this application. Until your database is running, you should use fake data to ensure your application is working properly.

- [] **Homepage (Logged out)**

  - Components:

    - [] Login/Signup button
    - [] Login/Signup modal (triggered when the button is pressed)
    - [] Header welcoming users to the site
    - [] Text explaining what the service is.
    - [] Link to the Search Page

  - [] **Signup Component (inside a modal):**

    - [] Should take an email address
    - [] Password (twice to make sure passwords match)
    - [] First and last name
    - [] Phone number

  - [] **Login Component (inside a modal):**
    - [] Email address
    - [] Password

- [] **Homepage (Logged In)**

  - [] Components:
    - [] Header welcoming user by their first and last name
    - [] Search button (can either be a link to search page or open modal of search component)
    - [] Should have a link to → My Pets Page
    - [] Has access to navigate to profile settings

- [] **Profile Settings**

  - [] Components:
    - [] Form with the following fields: password, email, first name, last name, phone number, user can add a short bio.
    - [] Save button to save any changes done.

- [] **My Pets Page**

  - [] (Can toggle between pets and saved pets)
  - [] Components (pets and same for saved pets):
    - [] Text displaying - you currently do not own or foster any pets. (if they don't have any pets)
    - [] Cards displaying all the pets the user owns/fosters

- [] **Card Component:**

  - [] Card component should display an image of the pet
  - [] Pet’s name
  - [] Pet’s current status (foster/adopted)
  - [] See more button (this button takes you to a full detailed description of the pet)

- [] **Pet Page**

  - [] Should be able to see all the pets details of a specific pet
  - [] Pet details: Type (dog, cat), Name, Adoption Status, Picture, Height, Weight, Color, Bio, Hypoallergenic (yes/no), dietary restrictions, breed of animal (Poodle, Siamese)
  - [] There should be a button for the owner of pet to return the pet to the adoption center (if they are fostering the pet or adopted it)
  - [] If the person is not the owner they should see a button to adopt and a button to foster. (If they are already fostering, they should see a button to adopt)
  - [] There should be an additional button to save for later (Or unsave if already saved)

- [] **Search Page**

  - [] Components:
    - [] Search bar
    - [] Results of search (List of animal card components that link to the pet page)

- [] **Search Bar Component:**

  - [] Can toggle between basic and advanced search

  - [] **Basic Search:**

    - [] Can search based on Type of animal

  - [] **Advanced search:**
    - [] Can search based on Adoption Status, Height, Weight, Type, Name

- [] **Admin Pages**

- [] **Add Pet**

  - [] Components:
    - [] Form allowing admin to add a pet (with all of the pet details)

- [] **Dashboard**

  - [] Components:

    - [] List of all the users in the database (pet owners and administrators)
    - [] Clicking on a user should display all the pets that the user owns along with all of their profile details so the administrators can contact the user.

    - [] List of all pets and ability to go to the pet page and edit. (The edit should be just like adding a pet but with the details already displayed there)

---
