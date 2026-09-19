# LearnHub - Σύστημα Διαχείρισης Φροντιστηρίου

Το **LearnHub** είναι μια εμπορική (business) web εφαρμογή τύπου CRUD, σχεδιασμένη για τη διαχείριση ενός φροντιστηρίου. Η εφαρμογή καλύπτει τις ανάγκες τριών διαφορετικών ρόλων (Γραμματεία/Admin, Καθηγητές, Μαθητές) και υλοποιήθηκε στο πλαίσιο του μαθήματος "Ειδικά Θέματα Τεχνολογίας Λογισμικού".



##  Αρχιτεκτονική & Τεχνολογίες (Tech Stack)
Το σύστημα ακολουθεί αυστηρή αρχιτεκτονική τριών (3) επιπέδων (Front-end, Business Logic, Database):

1. **Front-end (SPA):** Αναπτύχθηκε με **React.js**. Επικοινωνεί με το back-end αποκλειστικά μέσω RESTful Web Services (Axios).
2. **Back-end (Business Logic):** Αναπτύχθηκε σε **Java (Spring Boot)**. Διαθέτει 3-Layer Architecture (`Controllers`, `Services`, `Repositories`) και κάνει εκτενή χρήση **Dependency Injection**.
3. **Database & ORM:** Χρησιμοποιείται σχεσιακή βάση δεδομένων (**MySQL**). Η επικοινωνία με τη βάση γίνεται αποκλειστικά μέσω ORM (Hibernate / Spring Data JPA).

##  Βασικά Χαρακτηριστικά (Features)
* **Authentication & RBAC:** Ασφαλής σύνδεση με email/password και Role-Based Access Control (Admin, Teacher, Student). Προστατευμένα (Protected) Routes στο React.
* **Διαχείριση Χρηστών & Μαθημάτων (CRUD):** Προσθήκη και επεξεργασία μαθητών, καθηγητών και μαθημάτων από τη Γραμματεία.
* **Αναθέσεις & Οικονομικά:** Διασύνδεση μαθητών με μαθήματα και παρακολούθηση πληρωμών/διδάκτρων.
* **Ακαδημαϊκό Portal:** Δυνατότητα καταχώρησης απουσιών και βαθμολογιών από τους καθηγητές.

##  Agile Μεθοδολογία & Διαχείριση Έργου
Η σχεδίαση και ανάπτυξη ακολούθησε τις αρχές της Ευέλικτης Ανάπτυξης (Agile).
* Συγγραφή απαιτήσεων σε μορφή **User Stories**.
* Δημιουργία **Product Backlog** και χωρισμός σε **Sprints** (διάρκειας 15 ημερών).
* Το εργαλείο παρακολούθησης που χρησιμοποιήθηκε (Jira) βρίσκεται εδώ: https://learnhub-platform.atlassian.net/jira/software/projects/SCRUM/code?atlOrigin=eyJpIjoiMTgzNGZjYzVhY2JhNGQwNjgxMGVlOGQ4ZjYyMzg3NmUiLCJwIjoiaiJ9

##  Integration Tests
Έχουν αναπτυχθεί αυτοματοποιημένα **Integration Tests** για το Back-end (βάσει προδιαγραφών) με χρήση **JUnit 5** και **MockMvc**.
Τα tests ελέγχουν την ορθή λειτουργία των API Endpoints (Ανάκτηση στατιστικών, δημιουργία μαθημάτων κ.λπ.) με χρήση `@Transactional` για αυτόματο rollback στη βάση.
