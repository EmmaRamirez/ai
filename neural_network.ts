{
    let inputA = 12;
    let inputB = 4;

    let weightA = 0.5;
    let weightB = -1;

    inputA = (inputA * weightA);
    inputB = (inputB * inputB);

    let sum = inputA + inputB;

    let output = (sum) => sum > 0 ? 1 : -1;
}

//----------------------------------------------------//

{
    let inputs = [
        {
            weight: 0.5,
            value: 12,
        },
        {
            weight: -1,
            value: 4
        }
    ];

    let result = inputs.map((input, index) => {
        return input.value * input.weight
    }).reduce((prev, curr) => {
        return prev + curr
    }, 0);

    let activate = (result) => result > 0 ? 1 : -1;
}