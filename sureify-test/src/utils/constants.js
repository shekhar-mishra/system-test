// DEFINGING ENUM PROPERTY FOR GPRIORITY VALUE WE CAN ADD MORE PRIORITY VALUE FROM HERE IN FUTURE//
export const enumPriority = {
    None: "None",
    Low: "Low",
    Medium: "Medium",
    High: "High"
};

export const enumState = {
    Open: "Open",
    Done: "Done"
};

// DECLRING CLICK EVENT FOR LL BUTTON
export const enumClick = {
    Edit: "Edit",
    Delete: "Delete",
    Done: "Done",
    ReOpen: "ReOpen",
    View: "View"
};
//============== GLOBAL SERACH  AND SORT FUNCTIONALITY FOR ALL TABS==============

export const applySearchSortGroupOnData = function(dataSource, searchVal, propsToSearch, propToGroup, sortDetails, statusFilter) {

    if (hasValue(statusFilter))
        dataSource = dataSource.filter(item => item.state === statusFilter);

    dataSource = searchDataSource(dataSource, searchVal, propsToSearch);

    if (hasValue(sortDetails) && hasValue(sortDetails.column))
        dataSource = sortData(dataSource, sortDetails);

    return dataSource.reduce(function(rv, x) {
        (rv[x[propToGroup]] = rv[x[propToGroup]] || []).push(x);
        return rv;
    }, {});
};

const searchDataSource = (dataSource, searchVal, propsToSearch) => {

    if (!hasValue(dataSource) || !hasValue(searchVal) || !hasValue(propsToSearch) || propsToSearch.length <= 0) return dataSource;

    return dataSource.filter((item) => {
        return propsToSearch.some((eachProp) => {
            return item[eachProp].toLowerCase().indexOf(searchVal.toLowerCase()) > -1;
        });
    });
};
/* DEFINING CONSTANT FOR USING SAME MODAL POPUP FOR EDIT DELETE VIEW BASED ON THIS VALUE */
export const EntryWindowMode = {
    Add: 1,
    Edit: 2,
    View: 3,
    Delete:4
};

export const hasValue = (val) => {
    return val !== null && val !== undefined && val.toString().trim().length > 0;
};


//=============== GENERATING UNIQUE ID WHENEVER WE WILL CREATE  TASK================
export function createUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0,
            v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

export function sortData(dataSource, sortDetails) {

    let sortedData = dataSource.sort((a, b) => {
        if (hasValue(sortDetails.type) && sortDetails.type === "date") {
            return (
                convertDate(new Date(a[sortDetails.column]).toLocaleDateString()) -
                convertDate(new Date(b[sortDetails.column]).toLocaleDateString())
            );
        } else {
            const nameA = a[sortDetails.column].toUpperCase();
            const nameB = b[sortDetails.column].toUpperCase();
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
            return 0;
        }
    });

    if (sortDetails.direction === "desc") {
        sortedData.reverse();
    }
    return sortedData;
};


const convertDate = (d) => {
    var p = d.split("/");
    return +(p[2] + p[1] + p[0]);
};