export class DieDroop extends Die {
    constructor(termData) {
        termData.faces=6;
        super(termData);
    }

    /* -------------------------------------------- */

    /** @override */
    static DENOMINATION = "s";

    /** @override */
    get total(){
        return this.results.length;
    }

    /* -------------------------------------------- */

    /** @override */
    static getResultLabel(result) {
        return {
            "1": '<img src="modules/droop/assets/D1_inCHAT.png" />',
            "2": '<img src="modules/droop/assets/F2_inCHAT.png" />',
            "3": '<img src="modules/droop/assets/S1_inCHAT.png" />',
            "4": '<img src="modules/droop/assets/S2_inCHAT.png" />',
            "5": '<img src="modules/droop/assets/F1_inCHAT.png" />',
            "6": '<img src="modules/droop/assets/D1_inCHAT.png" />'
        }[result];
    }
}
