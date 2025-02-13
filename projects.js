const projects = document.querySelectorAll('.project');

projects.forEach(project=>{
    project.addEventListener('click',()=>{
        let link = project.getAttribute('link');
        if (link){
            window.open(link);
        };
    }
    )
}
)
