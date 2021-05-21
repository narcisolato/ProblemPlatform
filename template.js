const fs = require('fs');

const template = {
    html : function(board_table = "", board_contents = ""){
        const html_tamplate = `
        <!doctype html>
        <html>
        <head>
            <title>WEB2</title>
            <meta charset="utf-8">
        </head>
        <body>
            <div>${board_table}</div>
            <div>${board_contents}</div>
        </body>  
        </html>`;
        return html_tamplate; 
    },

    table : function(){
        const file_list = fs.readdirSync('Board', 'utf8');
        let list = "";
        for (var i = 0; i < file_list.length; i++){
            list += `
            <tr>
                <td>${i}</td>
                <td><a href="/?id=${file_list[i]}">${file_list[i]}</a></td>
                <td></td>
            </tr>`
            ;
        }
        const table_format = `
            <table>
                <thead>
                    <tr>
                        <th>순서</th>
                        <th>제목</th>
                        <th>조회수</th>
                    </tr>
                </thead>
                <tbody>                   
                    ${list}
                </tbody>
            </table>`;    
        return table_format;
    },

    contents : function() {

    }
}

const template_building = template.html(template.table());
// console.log(template_building);
module.exports = template_building;