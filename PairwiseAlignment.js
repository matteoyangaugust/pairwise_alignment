class PairwiseAlignment{
    constructor(seq1 = "", seq2 = ""){
        this._seq1 = seq1;
        this._seq2 = seq2;
        this._alignedSeq1 = "";
        this._alignedSeq2 = "";
        this._rowLen = seq2.length + 1;
        this._colLen = seq1.length + 1;
        this._alignedMatrix = [];
        this._tracingMatrix = [];
        this._scoreMatrix = [];
        this._checked = [];
    }
    run(){}

    get colLen() {
        return this._colLen;
    }

    set colLen(value) {
        this._colLen = value;
    }

    get checked() {
        return this._checked;
    }

    set checked(value) {
        this._checked = value;
    }

    get rowLen() {
        return this._rowLen;
    }

    set rowLen(value) {
        this._rowLen = value;
    }

    get seq1() {
        return this._seq1;
    }

    set seq1(value) {
        this._seq1 = value;
    }

    get seq2() {
        return this._seq2;
    }

    set seq2(value) {
        this._seq2 = value;
    }

    get alignedSeq1() {
        return this._alignedSeq1;
    }

    set alignedSeq1(value) {
        this._alignedSeq1 = value;
    }

    get alignedSeq2() {
        return this._alignedSeq2;
    }

    set alignedSeq2(value) {
        this._alignedSeq2 = value;
    }

    get alignedMatrix() {
        return this._alignedMatrix;
    }

    set alignedMatrix(value) {
        this._alignedMatrix = value;
    }

    get tracingMatrix() {
        return this._tracingMatrix;
    }

    set tracingMatrix(value) {
        this._tracingMatrix = value;
    }

    get scoreMatrix() {
        return this._scoreMatrix;
    }

    set scoreMatrix(value) {
        this._scoreMatrix = value;
    }
}
PairwiseAlignment.DERIVE = {
    ORIGIN: ".",
    FROM_TOP: "↑",
    FROM_LEFT: "←",
    FROM_DIAGONAL: "↖"
};