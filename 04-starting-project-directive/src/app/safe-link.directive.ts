import { Directive, input } from "@angular/core";

@Directive({
    selector : 'a[appSafeLinkDirective]',
    standalone : true,
    host : {
        '(click)'  : 'onClick($event)'
    }
})
export class SafeLinkDirective {

    queryParam = input('myapp');

    constructor(){
        console.log("Directive as been selected!!!")
    }

    onClick(event : MouseEvent){
    const leavingWindow = window.confirm("Do you want to window");

    if(leavingWindow){
    const address = (event.target as HTMLAnchorElement).href;
    (event.target as HTMLAnchorElement).href = address + '?from=myapp';
    return ;
}

event.preventDefault();
    }

}