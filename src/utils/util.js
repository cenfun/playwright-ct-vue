
export const foo = () => {
    console.log('foo');
    const f = false;
    if (f) {
        console.log('never covered');
    }
};


export const bar = () => {
    console.log('bar');
    const f = false;
    if (f) {
        console.log('never covered');
    }
};
