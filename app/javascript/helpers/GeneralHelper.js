export const statusList = [
    {label:"Applied", value:"applied"},
    {label:"Called", value:"called"},
    {label:"Technical Test", value:"techTest"},
    {label:"First Interview", value:"firstIn"},
    {label:"Second Interview", value:"secondIn"},
    {label:"Offer", value:"offer"},
    {label:"Reject", value:"reject"}];

export function getStatusLabel(value){
        let result = "";

        //filter function will return array to store all matched objects
         const status = statusList.filter(statusObj=> {
           return statusObj.value === value;
         });

         if(status === undefined || status.length == 0){
            result = "No this option available!"
         }
         else{
            status.map((option) =>
                result = option.label
            );
         }

         return result
       }

export const options = {
           place: 'br',
           message: '',
           type: "",
           icon: "now-ui-icons ui-1_bell-53",
           autoDismiss: 3
       }
