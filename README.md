# pairwise_alignment
This is the smiple implementation of pairwise alignment in Javascript.
Now I've only finished Smith–Waterman algorithm(Local sequence).
Example:
  1. let alignment = new LocalAlignment(seq1, seq2); // Initialize and run the procedure automatically.
  2. console.table(alignment.alignedMatrix);                // Show the matrix which contains the scores
  3. console.table(alignment.tracingMatrix);                // Show the matrix which contains derivation of each cell
  4. console.log(alignment.alignedSeq1);                    // Show the aligned seq1
  5. console.log(alignment.alignedSeq2);                    // Show the aligned seq2
