const btnIcon = document.getElementById("addToDo")?.querySelector("img") as HTMLImageElement;

btnIcon.addEventListener("mouseenter", () => (btnIcon.src = "/icons/addWhite.svg"));
btnIcon.addEventListener("mouseleave", () => (btnIcon.src = "/icons/addBlack.svg"));
