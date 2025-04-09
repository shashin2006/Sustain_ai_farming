import java.util.*;

class Main {
    public static int grade(String s) {
        // Mapping grades to points
        HashMap<Integer, String> hm = new HashMap<>();
        hm.put(10, "O");
        hm.put(9, "A+");
        hm.put(8, "A");
        hm.put(7, "B+");
        hm.put(6, "B");
        hm.put(5, "C");
        hm.put(0, "U");

        // Match the grade and return the corresponding key
        for (Map.Entry<Integer, String> entry : hm.entrySet()) {
            if (entry.getValue().equals(s)) {
                return entry.getKey();
            }
        }

        // If the grade is invalid, return 0
        return 0;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        // Subjects and their credit weights
        String[] subjects = {
            "COA (Computer Organization and Architecture)",
            "OS (Operating Systems)",
            "JAVA (Programming in Java)",
            "DAA (Design and Analysis of Algorithms)",
            "APTITUDE",
            "INTERNSHIP",
            "PD (Professional Development)",
            "UHV (Universal Human Values)",
            "MATHS"
        };
        int[] credits = {3, 3, 4, 4, 1, 1, 1, 3, 4};

        double totalWeightedGrades = 0;
        int totalCredits = 24; // Sum of all credits

        // Collect grades for each subject
        System.out.println("Enter your grades for the following subjects (e.g., O, A+, A, B+, B, C, U):");
        for (int i = 0; i < subjects.length; i++) {
            while (true) {
                System.out.print(subjects[i] + ": ");
                String gradeInput = sc.nextLine().toUpperCase();

                // Validate grade input
                int gradePoint = grade(gradeInput);
                if (gradePoint != 0 || gradeInput.equals("U")) {
                    totalWeightedGrades += gradePoint * credits[i];
                    break;
                } else {
                    System.out.println("Invalid grade! Please enter a valid grade (e.g., O, A+, A, B+, B, C, U).");
                }
            }
        }

        // Calculate GPA
        double gpa = totalWeightedGrades / totalCredits;

        // Display the GPA
        System.out.println("\nYour grades have been processed successfully!");
        System.out.printf("Your GPA for this semester is: %.2f\n", gpa);
    }
}