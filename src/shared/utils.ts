export function getMapFromArrayByPropertyKey(origArray: any[], propertyKey: string): { [key: string]: any } | undefined {
    
    if (!origArray || !origArray.length) return;

    const mappedObject: { [key: string]: any } = {};

    origArray.forEach((arrayMember) => {
        const arrayMemberKey: string = arrayMember[propertyKey];
        if (arrayMemberKey) {
            mappedObject[arrayMemberKey] = arrayMember;
        }
    })

    return mappedObject;
}

export function getSortedArrayFromMap(origMap: { [key: string]: any }, propertyKey: string): any[] | undefined {
    if (!origMap || typeof(origMap) !== 'object') return;

    const arrayOutput: any[] = Object.keys(origMap).map((mapKey) => origMap[mapKey]);

    arrayOutput.sort((arrMemberA, arrMemberB) => {
        const propertyA = arrMemberA[propertyKey];
        const propertyB = arrMemberB[propertyKey];

        return (propertyA < propertyB) ? -1 : (propertyA > propertyB) ? 1 : 0;
    });

    return arrayOutput;
}