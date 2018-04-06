/**
 * Save dataString to local file
 * 
 * @param {string} dataString
 */
const save = dataString => {
    var blob = new Blob([dataString]);
    var a = window.document.createElement("a");
    a.href = window.URL.createObjectURL(blob, {type: "text/plain"});
    a.download = "KMeans-data.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

module.exports = save