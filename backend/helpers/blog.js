exports.smartTrim = (str, length, delim, appendix) => {
    if(str.length <= length) return str;
    var trimmedStr = str.substring(0, length + delim.length);

    var lastDelimIndex = trimmedStr.lastIndexOf(delim);
    if(lastDelimIndex >= 0) trimmedStr = trimmedStr.substring(0, lastDelimIndex);

    if(trimmedStr) trimmedStr += appendix;
    return trimmedStr;  
};