let doc = new Array();
if(process.argv.length < 3){
    console.log("Please specify words");
    process.exit(0);
}

let lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('openthesaurus.txt')
});

lineReader.on('line', function (line) {
    doc.push(line);
});

lineReader.on('close', function (line){
    let lines = new Array();
    for (let i = 0; i <  doc.length; i++){     
            lines = doc[i].split(";");
            doc[i] = lines;
    }
    for(let i = 2; i < process.argv.length; i++){
        checkWord(process.argv[i]);
    }

    function checkWord(word){
        let exists = false;
        for(let i = 0; i < doc.length; i++){
            for(let y = 0; y < doc[i].length; y++){
                if(doc[i][y].search(word) != -1){
                    exists = true;
                    print(word, doc[i]);
                }
            }   
        }
        if(exists == false){
            console.log("No matches found");
            process.exit(0);
        }
    }
    
    function print(word, line){
        console.log(word+": ");
        for(let i = 0; i < line.length; i++){
            if(word != line[i]){
                console.log("\t"+line[i]);
            }        
        }
    }
});