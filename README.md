# Plantastic

## Description

Interactive MERN Stack Single-Page Application for plant enthusiasts to catalog their plants, make notes for their care, and send email reminders for care tasks.

## Table of Contents

- [Usage](#usage)
- [Credits](#credits)
- [License](#license)

## Usage

Plantastic is simple and intuitive. Users have the option to Login or Sign Up on visiting our homepage.

![Plantastic Homepage](/client/public/SS_Home.png)

When a new user signs up, they are sent a welcome email using nodemailer.

![Welcome Email](/client/public/SS_NewUserEmail.png)

New users are also automatically logged in. When a user logs in, they are redirect to their "My Garden" page. This is where their saved plants are displayed.

![My Garden View](/client/public/SS_MyGarden.png)

Using the search icon to the right takes users to the search page where they can find varius plants and add them to their garden.

![Search View](/client/public/SS_Search.png)

When a user clicks add plant, they are redirected to their "My Garden" view where the new plant is now displayed. From there the user can click any of their plants and view more details

![Plant Details View](/client/public/SS_PlantDetails.png)

The plant details view has a switch to turn email reminders on or off (this feature is still in development). They can also view helpful information about their plant, remove it from their garden, or add notes that will be displayed below.



## Credits

- [John Elmore](https://github.com/Letmego1st)
- [Maninder Manan](https://github.com/ManinderManan)
- [Paul Mendoza](https://github.com/pvmend)
- [Kate Rogers](https://github.com/KateMcRo)
- [Justin Rossi](https://github.com/Jrossi425)

Initial brand and design concepts on [Figma](https://www.figma.com/file/m8oHehHSpRv4UVn1XF3o66/Untitled?type=design&node-id=0%3A1&mode=design&t=EyK7GTrJV3yFUNgD-1)

Koding 101 [Nodemailer Tutorial](https://www.youtube.com/watch?v=MJhsVDpYzQs)

Email template created with [BEE](https://beefree.io/)

## License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

MIT License

Copyright (c) 2023 Kate Rogers

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
