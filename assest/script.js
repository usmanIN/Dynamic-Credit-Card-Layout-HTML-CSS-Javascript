
    function inputbox(size){
        let input = document.createElement("input");
        input.setAttribute("type","text");
        input.setAttribute("maxlength",size);
        return input;
    }    
    
    function DesignCard(selector,inputfield, digitLength){
        
        const element =  document.querySelector(selector);
        const message = document.querySelector("#message");
        
        if(digitLength%inputfield != 0){
            message.innerText = "Only Divisbly value allow! e.g. (4,16), (7,14), (3,9)";
            return;
        } 
        
        const size = (digitLength/inputfield);
    
        for (let index= 0; index < inputfield; index++) {
            element.appendChild(inputbox(size));
        }
    
        let input = element.querySelectorAll("input");
    
        input.forEach(function(e){
            
            e.addEventListener("keydown",function(key){
                // if(key.keyCode == 17 &&  key.keyCode == 86) key.preventDefault();
                // if(key.keyCode > 57) key.preventDefault();
                // if(key.keyCode === 32) key.preventDefault();
                // if(!isFinite(key.key) && key.keyCode!=8) key.preventDefault();
                
                if(e.value.length == size){
                    let next = e;
                    while(next = next.nextElementSibling){
                        if(next == null) break;
                        if(next.tagName.toLowerCase() == 'input'){
                            next.focus();
                            break;
                        }
                    }
                }
                if(e.value.length == 0){
                    let previous = e;
                    while(previous = previous.previousElementSibling){
                        if(previous == null) break;
                        if(previous.tagName.toLowerCase() == 'input'){
                            previous.focus();
                            break;
                        }
                    }
                }  
            });
        });
    
        element.querySelector("input").addEventListener("paste",function(e){
            let text = e.clipboardData.getData("text");
            let index = 0;
            text = text.replace(/\s/g, '');
            if(!isFinite(text)){
                message.innerText = "Only numeric string allows";
                return ;
            }
            if(text.length == digitLength){
                while(text.length > 0){
                    let str = text.slice(0,size);             
                    element.querySelectorAll("input")[index].value = str;
                    text = text.slice(size);                
                    index++;
                }
                

            }else{
                message.innerText = "Length of "+digitLength+" digit string required";
            }
        });

    }
    
    function CardView(size){
        let card = '';
        for (let index = 0; index < content.length; index++) {            
            text = content[index].match(/.{1,4}/g).join(" ");
            card += `<div class="credit">            
                <div class="credit-content">
                    <h3>Company Pvt.Ltd</h3>            
                    <div class="credit-number">
                        `+text+`
                    </div>
                    <div class="credit-exp">
                        Exp date 11/24
                    </div>
                    <div class="credit-name">
                        John Washington DELHI
                    </div>
                    <div class="credit-logo">
                        VISA
                    </div>
                    <button class="credit-button" onClick="deleteRow(this,`+index+`)">Delete</button>                
                </div>
            </div>`;
        }    
        document.querySelector("#table").innerHTML = card;
    }
    
    function deleteRow(e,index){
        e.parentNode.parentNode.remove();
        content.splice(index,1);
        if(content.length == 0){
            document.querySelector("#table").innerHTML = '';
        }
    }
    