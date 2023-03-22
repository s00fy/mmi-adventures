var IUTnums = [9, 10, 11, 12, 13];
var gen_nums = [];

function in_array(array, el) {
  for (var i = 0; i < 3; i++) if (array[i] == el) return true;
  return false;
}

function get_rand(array) {
  var rand = array[Math.floor(Math.random() * 5)];
  if (!in_array(gen_nums, rand)) {
    gen_nums.push(rand);
    return rand;
  }
  return get_rand(array);
}

for (var i = 0; i < 3; i++) {
  console.log("IUT " + get_rand(IUTnums));
}
