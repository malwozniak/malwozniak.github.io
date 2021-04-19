document.addEventListener('DOMContentLoaded', function(){
    const el = document.getElementById('texture-container');
    el.style.cursor = 'grab';

    let position = {top:0, left: 0, x:0, y:0 };


    const mouseSownHandler = function(e) {
        el.style.cursor = 'grabbing';
        el.style.userSelect = 'none';

        position = {
            left : el.scrollLeft,
            top: el.scrollTop,
            x : e.clientX,
            y : e.clientY,
        };

        document.addEventListener('mousemove', mouseMoveHandler);
        document.addEventListener('mouseup', mouseUpHandler);
    };

    const mouseMoveHandler = function(e) {
        const dx = e.clientX - position.x;
        const dy = e.clientY - position.y;

        el.scrollTop = position.top - dy;
        el.scrollLeft = position.left - dx;
    };

    const mouseUpHandler = function(){
        el.style.cursor = 'grab';
        el.style.removeProperty('user-select');

        document.removeEventListener('mousemove', mouseMoveHandler);
        document,removeEventListener('mouseup', mouseUpHandler);
    };

    el.addEventListener('mousedown', mouseDownHandler);
});