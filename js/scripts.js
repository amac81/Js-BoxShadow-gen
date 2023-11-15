class BoxShadowGenerator {
    constructor(
        horizontal,
        horizontalRef,
        vertical,
        verticalRef,
        blur,
        blurRef,
        spread,
        spreadRef,
        color,
        colorRef,
        opacity,
        opacityRef,
        previewBox,
        rule,
        webKitRule,
        mozRule
    ) {
        this.horizontal = horizontal
        this.horizontalRef = horizontalRef
        this.vertical = vertical
        this.verticalRef = verticalRef
        this.blur = blur
        this.blurRef = blurRef
        this.spread = spread
        this.spreadRef = spreadRef
        this.color = color
        this.colorRef = colorRef
        this.opacity = opacity
        this.opacityRef = opacityRef
        this.previewBox = previewBox
        this.rule = rule
        this.webKitRule = webKitRule
        this.mozRule = mozRule
    }
    initialize(){
        this.horizontalRef.value = this.horizontal.value;
        this.verticalRef.value = this.vertical.value;
        this.blurRef.value = this.blur.value;
        this.spreadRef.value = this.spread.value;
        this.colorRef.value = this.color.value;
        this.opacityRef.value = this.opacity.value;

        this.applyRule();
        this.showRule();
    }

    applyRule(){
        const rgbValue = this.hexToRgb(this.colorRef.value);
        const shadowRule = `${this.horizontalRef.value}px ${this.verticalRef.value}px ${this.blurRef.value}px ${this.spreadRef.value}px rgba(${rgbValue}, ${this.opacityRef.value})`;

        this.previewBox.style.boxShadow = shadowRule; 
        this.currentRule = shadowRule;
    }

    showRule(){
        this.rule.innerText = this.currentRule;
        this.webKitRule.innerText = this.currentRule;
        this.mozRule.innerText = this.currentRule;
    }

    updateValue(type, value){
        switch(type) {
            case "horizontal":{
                this.horizontalRef.value = value;
                break;
            }
            case "vertical":{
                this.verticalRef.value = value;
                break;
            }
            case "blur":{
                this.blurRef.value = value;
                break;
            }
            case "spread":{
                this.spreadRef.value = value;
                break;
            }
            case "color":{
                this.colorRef.value = value;
                break;
            }
            case "opacity":{
                this.opacityRef.value = value;
                break;
            }
        }

        this.applyRule();
        this.showRule();
    }
    
    hexToRgb (hex) {
        return `${("0x"+ hex[1] + hex[2]) | 0}, ${("0x" + hex[3] + hex[4]) | 0}, ${("0x" + hex[5] + hex[6]) | 0}`;
    }
}

// Elements selection
const horizontal = document.querySelector("#horizontal");
const horizontalRef = document.querySelector("#horizontal-value");
const vertical = document.querySelector("#vertical");
const verticalRef = document.querySelector("#vertical-value");
const blur = document.querySelector("#blur");
const blurRef = document.querySelector("#blur-value");
const spread = document.querySelector("#spread");
const spreadRef = document.querySelector("#spread-value");

const color = document.querySelector("#color");
const colorRef = document.querySelector("#color-value");

const opacity = document.querySelector("#opacity");
const opacityRef = document.querySelector("#opacity-value");

const previewBox = document.querySelector("#box");

const rule = document.querySelector("#rule span");
const webKitRule = document.querySelector("#webkit-rule span");
const mozRule = document.querySelector("#moz-rule span");

const rulesArea = document.querySelector("#rules-area");
const copyInfo = document.querySelector("#copy-info");

const boxShadow = new BoxShadowGenerator(
    horizontal,
    horizontalRef,
    vertical,
    verticalRef,
    blur,
    blurRef,
    spread,
    spreadRef,
    color,
    colorRef,
    opacity,
    opacityRef,
    previewBox,
    rule,
    webKitRule,
    mozRule
);

boxShadow.initialize();

// Functions

function copyRulesToClipboard() {
    const infoText = copyInfo.innerText;
    //regex to replace any sequence of two or more consecutive newline characters with just one
    const allRules = rulesArea.innerText.replace(/[\r\n]{2,}/g, "\n");

    rulesArea.style.background = "#fce2b1"
    copyInfo.innerText = "Regras copiadas!"
    
    //copy to clipboard
    navigator.clipboard.writeText(allRules).then(() => {
        setTimeout(() => {
            copyInfo.innerText = infoText;
            rulesArea.style.background = "#e3faf1"
          }, "500");      
    })
}

// Events

horizontal.addEventListener("input", (e) => {
    const value = e.target.value;
    boxShadow.updateValue("horizontal", value);
});

horizontalRef.addEventListener("input", (e) => {
    let value = 0;
    const max = +horizontal.getAttribute("max")
    const min = +horizontal.getAttribute("min")

    if( e.target.value < min){
        e.target.value = min;
    }        
    
    if( e.target.value > max){
        e.target.value = max;
    }    
    
    value = e.target.value;
    boxShadow.updateValue("horizontal", value);
    horizontal.value = value;
});

vertical.addEventListener("input", (e) => {
    const value = e.target.value;
    boxShadow.updateValue("vertical", value);
});

verticalRef.addEventListener("input", (e) => {
    let value = 0;
    const max = +vertical.getAttribute("max")
    const min = +vertical.getAttribute("min")

    if( e.target.value < min){
        e.target.value = min;
    }        
    
    if( e.target.value > max){
        e.target.value = max;
    }    
    
    value = e.target.value;
    vertical.value = value;
    boxShadow.updateValue("vertical", value);
});

blur.addEventListener("input", (e) => {
    const value = e.target.value;
    boxShadow.updateValue("blur", value);
});

blurRef.addEventListener("input", (e) => {
    let value = 0;
    const max = +blur.getAttribute("max")
    const min = +blur.getAttribute("min")

    if( e.target.value < min){
        e.target.value = min;
    }        
    
    if( e.target.value > max){
        e.target.value = max;
    }    
    
    value = e.target.value;
    blur.value = value;
    boxShadow.updateValue("blur", value);
});


spread.addEventListener("input", (e) => {
    const value = e.target.value;
    boxShadow.updateValue("spread", value);
});

spreadRef.addEventListener("input", (e) => {
    let value = 0;
    const max = +spread.getAttribute("max")
    const min = +spread.getAttribute("min")

    if( e.target.value < min){
        e.target.value = min;
    }        
    
    if( e.target.value > max){
        e.target.value = max;
    }    
    
    value = e.target.value;
    spread.value = value;
    boxShadow.updateValue("spread", value);
});

color.addEventListener("input", (e) => {
    const value = e.target.value;
    boxShadow.updateValue("color", value);
});

colorRef.addEventListener("input", (e) => {
    const value = e.target.value;
    color.value = value;
    boxShadow.updateValue("color", value);
});

opacity.addEventListener("input", (e) => {
    const value = e.target.value;
    boxShadow.updateValue("opacity", value);
});

opacityRef.addEventListener("input", (e) => {
    let value = 0;
    const max = +opacity.getAttribute("max")
    const min = +opacity.getAttribute("min")

    if( e.target.value < min){
        e.target.value = min;
    }        
    
    if( e.target.value > max){
        e.target.value = max;
    }    
    
    value = e.target.value;
    opacity.value = value;
    boxShadow.updateValue("opacity", value);
});

rulesArea.addEventListener("click", (e) => {
    e.preventDefault();
 
   

    copyRulesToClipboard();

});

