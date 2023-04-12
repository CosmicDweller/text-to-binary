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
  if (num_val > 11) {
    padding = 16 - num_val;
  } else if (num_val > 7) {
    padding = 11 - num_val;
  } else {
    padding = 7 - num_val;
  }

  while (padding > 0) {
    var pad = "0";
    num = pad + num;
    padding--;
  }
  console.log(num.length);
  if (num.length == 16) {
    var byte1 = "1110" + num[0] + num[1] + num[2] + num[3];
    var byte2 = "10" + num[4] + num[5] + num[6] + num[7] + num[8] + num[9];
    var byte3 =
      "10" + num[10] + num[11] + num[12] + num[13] + num[14] + num[15];
    return [byte1, byte2, byte3];
  } else if (num.length == 11) {
    var byte1 = "110" + num[0] + num[1] + num[2] + num[3] + num[4];
    var byte2 = "10" + num[5] + num[6] + num[7] + num[8] + num[9] + num[10];
    console.log(byte1);
    console.log(byte2);
    return [byte1, byte2];
  } else {
    var byte1 = "0" + num;
    return byte1;
  }
}
