const format_number = (number) => {
    return number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
};

const format_link = (link, request) => {
    if (link.includes("-")) return link;
    return !request ? link.replace(" ", "-") : link.replace("-", " ");
};

export { format_number, format_link };
