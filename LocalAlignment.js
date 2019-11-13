class LocalAlignment extends PairwiseAlignment{
    constructor(seq1 = "", seq2=""){
        super(seq1, seq2);
        this._scores = {
            gap: -5,
            mismatched: -2,
            matched: 10
        };
        this._highestPos = {row:0, col:0};
        this.run();
    }

    run(){
        this.initialAlignedMatrix();
        this.fillMatrices();
        this.traceBack();
    }

    initialAlignedMatrix() {
        let alignedCol = [];
        let trackingCol = [];
        let checkedCol = [];
        for(let i=0; i<this.colLen; i++) {
            alignedCol[i] = 0;
            trackingCol[i] = PairwiseAlignment.DERIVE.ORIGIN;
            checkedCol[i] = false;
        }
        for(let i=0; i<this.rowLen; i++) {
            this.alignedMatrix[i] = JSON.parse(JSON.stringify(alignedCol));
            this.tracingMatrix[i] = JSON.parse(JSON.stringify(trackingCol));
            this.checked[i] = JSON.parse(JSON.stringify(checkedCol));
        }
    }

    fillMatrices(row = 1) {
        if(row === this.rowLen) return;
        for(let col=1; col<this.colLen; col++){
            let fromLeft = this.alignedMatrix[row][col-1] + this._scores.gap;
            let fromTop = this.alignedMatrix[row-1][col] + this._scores.gap;
            let fromDiag = this.alignedMatrix[row-1][col-1] +
                (this.seq1.charAt(col-1) === this.seq2.charAt(row-1) ?
                this._scores.matched : this._scores.mismatched);
            if(fromDiag > fromTop && fromDiag > fromLeft){
                if(fromDiag > 0){
                    this.alignedMatrix[row][col] = fromDiag;
                    this.tracingMatrix[row][col] = PairwiseAlignment.DERIVE.FROM_DIAGONAL;
                    if(fromDiag > this.alignedMatrix[this._highestPos.row][this._highestPos.col])
                        this._highestPos = {row: row, col: col};
                }
            }else if(fromTop > fromLeft && fromTop > fromDiag){
                if(fromTop > 0){
                    this.alignedMatrix[row][col] = fromTop;
                    this.tracingMatrix[row][col] = PairwiseAlignment.DERIVE.FROM_TOP;
                    if(fromTop > this.alignedMatrix[this._highestPos.row][this._highestPos.col])
                        this._highestPos = {row: row, col: col};
                }
            }else if(fromLeft > fromTop && fromLeft > fromDiag){
                if(fromLeft > 0){
                    this.alignedMatrix[row][col] = fromLeft;
                    this.tracingMatrix[row][col] = PairwiseAlignment.DERIVE.FROM_LEFT;
                    if(fromLeft > this.alignedMatrix[this._highestPos.row][this._highestPos.col])
                        this._highestPos = {row: row, col: col};
                }
            }
        }
        this.fillMatrices(row+1);
    }

    traceBack() {
        let derive = "";
        let currentRow = this._highestPos.row;
        let currentCol = this._highestPos.col;
        while(derive !== PairwiseAlignment.DERIVE.ORIGIN && currentRow >= 1 && currentCol >= 1){
            derive = this.tracingMatrix[currentRow][currentCol];
            if(derive === PairwiseAlignment.DERIVE.FROM_DIAGONAL){
                this.alignedSeq1 = `${this.seq1[currentCol-1]}${this.alignedSeq1}`;
                this.alignedSeq2 = `${this.seq2[currentRow-1]}${this.alignedSeq2}`;
                currentRow--;
                currentCol--;
            }else if(derive === PairwiseAlignment.DERIVE.FROM_LEFT){
                this.alignedSeq1 = `${this.seq1[currentCol-1]}${this.alignedSeq1}`;
                this.alignedSeq2 = `-${this.alignedSeq2}`;
                currentCol--;
            }else{
                this.alignedSeq1 = `-${this.alignedSeq1}`;
                this.alignedSeq2 = `${this.seq2[currentRow-1]}${this.alignedSeq2}`;
                currentRow--;
            }
        }
    }
}