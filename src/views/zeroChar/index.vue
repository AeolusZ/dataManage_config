<template>
    <div :style="{margin: '10px 30px' }">
        <el-button @click="handleClick('猪头')">点击生成加密文案</el-button>
        <el-card headerc="加密文案" class="comment">{{comment}}</el-card>
        <el-card headerc="文案中秘文" class="comment">{{uncomment}}</el-card>
    </div>
</template>
<script>
export default {
    data(){
        return {
            comment: '',
            uncomment: ''
        }
    },
    methods: {
        zeroPad(num){
            return '00000000'.slice(String(num).length) + num
        },
        handleClick(username){
            let mm = username.split('').map(char => {
                return this.zeroPad(char.charCodeAt(0).toString(2))
            }).join(' ')
            this.comment = `这是${this.binaryToZeroWidth(mm)}一条加密文案`
            this.uncomment = `${this.binaryToText(this.zeroWidthToBinary(this.binaryToZeroWidth(mm)))}`
        },
        binaryToZeroWidth(binary) {
           return binary.split('').map((binaryNum) => {
                const num = parseInt(binaryNum, 10);
                if (num === 1) {
                    return '\u200B'; // zero-width space
                } else if (num === 0) {
                    return '\u200C'; // zero-width non-joiner
                }
                return '\u200D'; // zero-width joiner 零宽连接符c
            }).join('') // zero-width no-break space
        },
        zeroWidthToBinary (string) {
           return  string.split('').map((char) => { // zero-width no-break space
                if (char === '\u200B') { // zero-width space 零宽空格
                    return '1';
                } else if (char === '\u200C') {  // zero-width non-joiner 零宽非连接符
                    return '0';
                }
                return ' '; // add single space  
            }).join('')
            
        },
        binaryToText(string){
           return string.split(' ').map(num =>
                String.fromCharCode(parseInt(num, 2))
            ).join('')
        }
  
    }
}
</script>
<style scoped>
.comment {
    width: 200px;
    height: 200px;
    margin: 10px 0;
}
</style>