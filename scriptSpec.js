describe("validateInputs", () => {
    it("validate input", () => {
        expect(UI.validateInputs("KA02KB0003")).toBe(true);
        expect(UI.validateInputs("KA-02")).toBe(false);
    });
});


describe("searchEntry", () => {
    let entry;
    let flag;
    beforeEach(function() {
        entry = new Entry("KA02KB0003", 3);

        if(UI.checkDuplicates("KA02KB0003")){
            flag = true;
            Store.addEntries(entry);
        }
    });

    afterEach(function() {
        if(flag)
            Store.removeEntries("KA02KB0003");
    });

    it("search the given entry", () => {
        expect(entry).toEqual(jasmine.objectContaining(UI.searchEntry("KA02KB0003")));
    });
});

describe("checkDuplicates", () => {
    beforeEach(function() {
        Store.addEntries(new Entry("KA02KB0004", 4));
    });

    afterEach(function() {
        Store.removeEntries("KA02KB0004");
    });

    it("check for duplicates", () => {
        expect(UI.checkDuplicates("KA02KB0004")).toBe(false);
    });
});

describe("AddEntries", () => {
    beforeAll(function() {
        Store.removeEntries("KA02KB0004");
    });

    afterAll(function() {
        Store.removeEntries("KA02KB0004");
    });

    it("add entry to storage", () => {
        Store.addEntries(new Entry("KA02KB0004", 4));
        expect(UI.checkDuplicates("KA02KB0004")).toBe(false);
    });
});

describe("removeEntries", () => {
    beforeEach(function() {
        Store.addEntries(new Entry("KA02KB0004", 4));
    });

    it("remove an entry", () => {
        Store.removeEntries("KA02KB0004");
        expect(UI.checkDuplicates("KA02KB0004")).toBe(true);
    });
});


describe("getParkingSlot", () => {
    let flag;
    beforeEach(function() {
        if(!UI.checkDuplicates("KA02KB0003")){
            flag = true;
            Store.addEntries(new Entry("KA02KB0003", 3));
        }
    });

    afterEach(function() {
        if(flag)
            Store.removeEntries("KA02KB0003");
    });

    it("check availability of parking slot", () => {
        expect(Store.getParkingSlot()).toBe(3);
    });
});

describe("addFunction", () => {
    let entry;
    beforeEach(function() {
        entry = new Entry("KA02KB0004", 4);
    });

    afterEach(function() {
        Store.removeEntries("KA02KB0004");
    });

    it("check add function", () => {
        expect(addFunction("KA02KB0004")).toEqual(entry);
    });
});