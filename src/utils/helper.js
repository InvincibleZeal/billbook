export const refreshPage = () => {
    window.location.reload(false);
};

export const formatDate = (date) => {
    return new Date(date * 1000).toLocaleString("en", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
};
