const inputPromo = document.querySelector(".bonus-input");
const btnBonus = document.querySelector(".bonus-btn");
const spanBonus = document.querySelector(".bonus");

function promoCod(...ints) {
  ints = inputPromo.value;
  if (typeof inputPromo.value !== Number) {
    spanBonus.textContent = "Допускаются только цифры";
  }
  const newArr = [...ints].join("").split("");
  if (newArr.length < 8) {
    console.log("введено недостаточно символов");
    spanBonus.textContent = "введено недостаточно символов";
    return;
  }
  if (newArr.length > 8) {
    console.log("введено больше допустимого ");
    spanBonus.textContent = "введено больше допустимого";
    return;
  }

  const buzz = newArr
    .map((el) => (+el % 2 === 0 ? +el : 0))
    .filter((el) => el !== undefined)
    .reduce((acc, el) => acc + el);

  const noBuzz = newArr
    .map((el) => (+el % 2 !== 0 ? +el : 0))
    .filter((el) => el !== undefined)
    .reduce((acc, el) => acc + el);

  if (newArr[0] % 2 === 0) {
    newArr.shift();
  }
  if (newArr[newArr.length - 1] % 2 === 0) {
    newArr.pop();
  }

  const thousand = newArr

    .map((el, i, a) => {
      return a[i] + a[i + 1];
    })
    .map((el) => +el)
    .filter((el, i, a) => {
      if (el === NaN) {
        return a.shift();
      }
      return el;
    })

    .filter((el, i, a) => el % 2 !== 0)

    .map((el, i, a) => {
      if (
        (el > 89 || el < 80) &&
        (el > 69 || el < 60) &&
        (el > 49 || el < 40) &&
        (el > 29 || el < 20) &&
        (el > 9 || el < 0)
      ) {
        return el;
      }
    });

  if (thousand[0] === undefined) {
    thousand.shift();
  }

  if (thousand[thousand.length - 1] === undefined) {
    thousand.pop();
  }
  const index = thousand.findIndex((item) => item === undefined);

  const twoThosand = thousand

    .map((el, i, a) => {
      const arr = [];
      if (a[2] === undefined) {
        arr.push(a[index - 1], a[index], a[index + 2]);
      } else {
        arr.push(a[index - 1], a[index], a[index + 1]);
      }
      return arr;
    })
    .flat(Infinity)
    .slice(0, 3)
    .filter((el) => el !== undefined)
    .join("")
    .split("")
    .map((el, i, a) => {
      if (a[0] < a[1] && a[2] < a[3]) {
        return +el;
      }
      return;
    })
    .filter((el) => el !== undefined);
  const oneThousand = thousand
    .map((el, i, a) => {
      const arr = [];
      if (a[2] === undefined) {
        arr.push(a[index - 1], a[index], a[index + 2]);
      } else {
        arr.push(a[index - 1], a[index], a[index + 1]);
      }

      return arr;
    })
    .flat(Infinity)
    .slice(0, 3)
    .filter((el) => el !== undefined);

  if (twoThosand.length > 1) {
    spanBonus.textContent = "2000";
    inputPromo.value = "";
  } else if (oneThousand.length > 1) {
    spanBonus.textContent = "1000";
    inputPromo.value = "";
  } else if (buzz > noBuzz) {
    spanBonus.textContent = "100";
    inputPromo.value = "";
  } else if (buzz < noBuzz) {
    spanBonus.textContent = "0";
    inputPromo.value = "";
  } else if (buzz === noBuzz) {
    spanBonus.textContent = "0";
    inputPromo.value = "";
  }
}

btnBonus.addEventListener("click", promoCod);
