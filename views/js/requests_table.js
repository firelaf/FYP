table = document.querySelector('.requests-table');


fetch('/database/requests', {method: 'POST'})
.then(res => {
    return res.json();
})
.then(resData => {
    resData.forEach(item => {
        let requestDateParsed = item.requestDate.split("T");

        table.innerHTML += `<tr><td>${item.startTime}</td>
                                <td>${item.endTime}</td>
                                <td>${requestDateParsed[0]}</td>
                                <td>${item.assignedTo_id}</td></tr>`;
    })
    //console.log(resData); DEBUG
});