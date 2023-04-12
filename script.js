var text = document.getElementById("text");
var binary = document.getElementById("binary");
var copy = document.getElementById("copy");

var text_val = "";

copy.addEventListener("click", copyBinary);
text.addEventListener("keyup", changeText);

function copyBinary() {
  binary.select();
  binary.setSelectionRange(0, 99999);
  navigator.clipboard.writeText(binary.value);

  var toastElList = [].slice.call(document.querySelectorAll(".toast"));
  var toastList = toastElList.map(function (toastEl) {
    return new bootstrap.Toast(toastEl);
  });
  toastList.forEach((toast) => toast.show());
}

function changeText() {
  text_val = text.value;
  bin_val = genBinary(text_val);
  binary.innerText = bin_val.join(" ");
  // console.log(text_val);
}

function genBinary(text) {
  text_list = text_val.split("");

  bin_list = text_list.map(findUni);

  return bin_list.flat();
}

function findUni(value) {
  var num = value.charCodeAt(0).toString(2);
  console.log(num);
  console.log(value.charCodeAt(0));
  var num_val = num.length;
  var padding;
  if (num_val > 8) {
    padding = 16 - num_val;
  } else {
    padding = 8 - num_val;
  }
  // var padding = num_val < 16 ? 16 - num_val : num_val % 16;
  while (padding > 0) {
    var pad = "0";
    num = pad + num;
    padding--;
  }

  if (num.length > 8) {
    var byte1 = "1110" + num[0] + num[1] + num[2] + num[3];
    var byte2 = "10" + num[4] + num[5] + num[6] + num[7] + num[8] + num[9];
    var byte3 =
      "10" + num[10] + num[11] + num[12] + num[13] + num[14] + num[15];
    return [byte1, byte2, byte3];
  }
  return num;
}
