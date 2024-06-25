const mission = process.argv[2]

console.log(process.argv)

if (mission === "learn") {
    console.log(`Time to write some node code`);
}else{
    console.log(`Is ${mission} really more fun?`);
}
