# Outcome-Based Education (Attainments)
This is an In-House Project of Geethanjali College of Engineering and Technology.
## Abstract
* Outcome-based education (OBE) Attainments is an educational approach focused on defining and achieving specific outcomes that reflect what students should know and be able to do after completing a course or program. It ensures that teaching, assessment, and feedback are aligned with these outcomes, promoting continuous improvement in educational quality.
* Course Outcomes (COs) are specific learning goals for each course. Rubrics link COs to assessment elements, where student performance is evaluated, and average percentages determine attainment levels. This structured process ensures course content aligns with measurable student learning achievements. 
* Program Outcomes (POs) are broader skills and competencies students acquire across the program, which are pre-defined by the National Board of Accreditation (NBA). COs map to POs, ensuring that individual course achievements contribute to overall program goals. This mapping is key to assessing program effectiveness and graduate readiness. 
* Program Educational Objectives (PEOs) represent the long-term achievements expected from graduates, including career success and societal impact. PEOs are informed by CO and PO data, creating a cohesive framework that connects course-level learning with broader program goals. This project is developed using the tech stack of React, Node.js, HTML, CSS, Bootstrap, and MongoDB.

## Existing System
* The existing system is as follows and has few issues with obtaining Outcome-Based Attainments for all the courses of a given regulation:
- The course outcomes and CO-PO mappings of a course in the current regulation are being consecutively used by the faculty coordinators of upcoming semesters; while they keep changing for every new regulation. It is causing an issue of making a record of attainments properly.
- Providing access to the confidential Excel sheets to the faculty to enter the student marks, is causing a problem again due to human errors, layout changes, accidental data deletion, modification of marks, etc. The admin must re-check for correctness of every aspect which is a tiresome task.
- The calculation formulae related to every course rubric are explicitly written by the admin according to the type of course and what rubric is considered. This in itself is a huge task and is burdensome for the admin to manage the same for all the courses in the regulation. 

## Proposed System
* The proposed system will contain the following:
- Admin-privileged system to maintain the Course Attainments. 
- Admin will assign COs and CO-PO mappings to courses and then map each course with a course coordinator.
- Faculty access is provided to upload the marks obtained by students for those rubrics.
* The proposed system will automate the entire process – from calculating the percentages for each rubric to calculating the level of attainments and then mapping them with the CO-PO table. 
- Also, with a few more averaging operations, the overall attainments are obtained for all COs.
- This system will help the admin to efficiently maintain the course attainments with minimum (or) no human error. Automation of this calculation process will help coordinators and admins streamline the academic regulation works in an easier way. 

## Hardware Requirements
1. Processor: Intel Core i5 or higher (or equivalent)
2. RAM: Minimum 8 GB (16 GB recommended for better performance)
3. Storage: At least 100 GB of free space (SSD recommended for faster performance)
4. Display: 1366 x 768 resolution or higher
5. Internet Connectivity: Stable broadband connection for development and testing
6. Peripherals: Standard keyboard, mouse, and monitor

## Software Requirements
1. Operating System: Windows 10/11, macOS, or Linux (Ubuntu 20.04 or higher)
2. Code Editor/IDE: Visual Studio Code or any preferred code editor
3. Backend Framework: Node.js with Express.js
4. Frontend Libraries/Frameworks: React.js, HTML, CSS, Bootstrap
5. Database: MongoDB (local setup or cloud-based like MongoDB Atlas)
6. Version Control: Git (with GitHub or GitLab for repository management)
7. Package Manager: npm (Node Package Manager) for installing dependencies
8. Browser: Chrome, Firefox, or any modern web browser for testing
9. Runtime Environment: Node.js (version 14.x or higher)
10. Security Libraries: bcrypt for password encryption
