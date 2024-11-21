export const getMonthString = (dateString:string) => {

const date = new Date(dateString);

const monthName = date.toLocaleString('en-US', { month: 'short'});

return monthName
}

export const getMonth = (dateString:string) => {

    const date = new Date(dateString);
    
    const monthName = date.toLocaleString('en-US', { month: '2-digit'});
    
    return monthName
    }


export const getFullDate = (dateString:string) => {

    
    const date = new Date(dateString);
    
    const day = date.getDate();
    const month = date.toLocaleString('en-US', { month: 'short' }); 
    const year = date.getFullYear();
    
    const formattedDate = `${day}-${month}-${year}`;
    
    return formattedDate; 
}