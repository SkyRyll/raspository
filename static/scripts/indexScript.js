// List entries in database
$(document).ready(function () {
    $.ajax({
        url: "/getSystemInfo",
        method: "GET",
        dataType: "json",
        success: function (data) {
            data.forEach(function (entry) {
                const entryHtml = createEntry(entry);
                $("#sysInfoList").append(entryHtml);
            });
        },
        error: function (error) {
            console.error("Error fetching data for List 1: " + error.responseText);
        },
    });
});

function createEntry(entry) {
    return `
    <div class="row">
        <div class="col-sm listentry">${entry.date}</div>
        <div class="col-sm listentry">${entry.temp}°C</div>
        <div class="col-sm listentry">${entry.avgload1}</div>
        <div class="col-sm listentry">${entry.avgload5}</div>
        <div class="col-sm listentry">${entry.avgload15}</div>
    </div>`;
}
