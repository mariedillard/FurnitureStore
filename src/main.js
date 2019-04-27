import $ from 'jquery';
import { FurnitureService } from './js/script.js'; 
$(document).ready(function() {
    $('#furnitureSearch').click(function() {
        let furnitureService = new FurnitureService(); 
        let promise = furnitureService.getFurniture(); 
        const search = $('#search').val();
        promise.then(function(response) {
            $(`.showFurniture`).empty();
            let body = JSON.parse(response);
            for (let i  = 0; i < Object.keys(body.body.data).length; i++) {
                let type =  body.body.data[i].type;
                if( type === search) {
                    $('.showFurniture').append(`
                        <p><img src='${body.body.data[i].imageUrl}' width='200px'></p>
                        <p>${body.body.data[i].name}</p>
                        <p>${body.body.data[i].colors}</p>
                        <p><em>${body.body.data[i].description}</p>
                   `);
                }
            }
        }, function(error) {
            $('.showErrors').text(`There was an error processsing your request: ${error.message}`);
        });
    });
});