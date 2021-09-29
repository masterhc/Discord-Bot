const { sechDependencies } = require("mathjs")

console.log(correctedTime(2.155*3600))
function correctedTime(time)
{
  console.log(time)
  let hour = Math.trunc(time/(3600))
  let min = (Math.trunc((time-(3600)*hour)/60))
  let sec = Math.trunc(time-(3600*hour+min*60))
  time = hour+':'+min+':'+sec;
}