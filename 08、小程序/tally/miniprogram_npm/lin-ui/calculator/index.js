// component/calculator/calculator.js
var util = require("../../../utils/util.js");
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    show:{
      type:Boolean,
      value:false
    },
    pageBottom:{
      type:String,
      value:'0'
    },
    resultNum:{
      type:Number,
      value:0
    },
    createTime:{
      type:String,
      value:util.formatTime(new Date()).split('')[0]
    }
  },


  /**
   * 页面的初始数据
   */
  data: {
    finalResult: 0,//显示屏上的结果
    operationBtnsOn: false,//是否按下了操作按钮
    preResult: 0,//上次的结果
    operationBtnType: '',//操作
    savePre: false,//是否保存上一次的显示屏内容
    clearResult: false,//是否清除显示屏上的结果
    resultText: "",//输入记录
    historyOperationList: [],//历史操作列表
    figures: 8,//保留位数
    dateTime:'',//时间 为空默认
  },

  observers: {
    'createTime':function (val) {
      this.setData({
        dateTime: val+'',
      })
      this.triggerEvent('getTimeClick',val+'')
    },
    'resultNum':function (val) {
      this.setData({
          finalResult: val+'',
      })
      this.triggerEvent('changeShow',{show:true})
    },
  },
  methods: {
    /**
     * 点击时间事件
     */
    datetime: function(e) {
      this.setData({
        dateTime:e.detail.value
      },()=>{
        this.triggerEvent('getTimeClick',e.detail.value)
      })
    },
    /**
     * 点击显示组件
     */
    showCalculator: function(){
      this.triggerEvent('calculatorAction',{show:this.data.show})
    },
    /**
    * 点击清空
    */
    cleanResult: function () {
      this.setData({
        finalResult: 0,
        operationBtnsOn: false,
        operationBtnType: '',
        preResult: 0,
        savePre: false,
        clearResult: false,
        resultText: ''
      })
    },

    /**
     * 点击退格
     */
    deleteInput: function () {
      if (this.data.finalResult == "" || this.data.finalResult == "-") {
        this.setData({
          finalResult: 0
        })
      }
      if (typeof this.data.finalResult == "number") {
        this.data.finalResult = this.data.finalResult.toString();
      }
      if (this.data.resultText != "" && Number(this.data.finalResult) != 0) {
        let temp = this.data.resultText.substring(this.data.resultText.length - 1);
        if (temp == "+" || (temp == "-" && this.data.resultText) || temp == "*" || temp == "/") {
          this.setData({
            resultText: this.data.resultText + this.data.finalResult.substring(0, this.data.finalResult.length - 1)
          })
        } else {
          this.setData({
            resultText: this.data.resultText.substring(0, this.data.resultText.length - 1)
          })
        }
      } else {
        if (this.data.finalResult.substring(0, this.data.finalResult.length - 1).length > 0) {
          this.setData({
            resultText: this.data.resultText.substring(0, this.data.resultText.length - 1)
          })
        } else {
          if (this.data.resultText.length > 0) {
            this.setData({
              resultText: this.data.resultText.substring(0, this.data.resultText.length - 1)
            })
          }
        }
      }
      if (Number(this.data.finalResult) != 0 && Number(this.data.finalResult.substring(0, this.data.finalResult.length - 1)) != 0) {
        this.setData({
          finalResult: this.data.finalResult.substring(0, this.data.finalResult.length - 1)
        })
      } else {
        if (this.data.finalResult.substring(0, this.data.finalResult.length - 1).length > 1) {
          this.setData({
            finalResult: this.data.finalResult.substring(0, this.data.finalResult.length - 1)
          })
        } else {
          this.setData({
            finalResult: 0
          })
        }
      }
    },

    /**
     * 点击输入
     */
    inputNum: function (e) {
      var finalResult = this.data.finalResult;
      if (Number(finalResult) == 0) {
        if (finalResult.length > 8) {
          return;
        }
        if (e.currentTarget.dataset.num == ".") {
          if (finalResult === "-0") {
            finalResult = "-0."
          } else {
            finalResult = "0."
          }
        } else {
          if (finalResult.toString().substring(0, 2) == "0." && finalResult.length >= 2) {
            finalResult += e.currentTarget.dataset.num;
          } else {
            if (finalResult === "-0.") {
              finalResult = "-0." + e.currentTarget.dataset.num;
            } else {
              if (finalResult === "-0") {
                finalResult = "-" + e.currentTarget.dataset.num;
              } else {
                finalResult = e.currentTarget.dataset.num;
              }
            }

          }
        }
        this.setData({
          savePre: false
        })
      } else {
        if (this.data.savePre) {
          if (finalResult.length > 8 && !this.data.operationBtnsOn) {
            return;
          }
          if (e.currentTarget.dataset.num == ".") {
            if (finalResult == "-") {
              finalResult = "-0.";
            } else {
              finalResult = "0.";
            }
          } else {
            if (finalResult == "-") {
              finalResult = "-" + e.currentTarget.dataset.num;
            } else {
              finalResult = e.currentTarget.dataset.num;
            }
          }

          this.setData({
            savePre: false
          })
        } else {
          if (finalResult.length > 8) {
            return;
          }
          if (this.data.clearResult) {
            finalResult = e.currentTarget.dataset.num;
            this.setData({
              clearResult: false
            })
          } else {
            if (finalResult == ".") {
              finalResult = "0." + e.currentTarget.dataset.num;
            } else {
              if (finalResult.indexOf(".") > -1) {
                if (e.currentTarget.dataset.num != ".") {
                  finalResult = finalResult + e.currentTarget.dataset.num;
                }
              } else {
                finalResult = finalResult + e.currentTarget.dataset.num;
              }
            }
          }
        }
      }
      this.setData({
        finalResult: finalResult,
        resultText: Number(this.data.resultText) == 0 ? e.currentTarget.dataset.num : this.data.resultText + e.currentTarget.dataset.num
      })
    },

    /**
     * 点击相加
     */
    operationPlus: function () {
      if (this.data.operationBtnsOn) {
        this.handleOperation();
        this.setData({
          operationBtnType: 'plus',
          savePre: true,
          clearResult: false
        })
      } else {
        this.setData({
          operationBtnsOn: true,
          operationBtnType: 'plus',
          preResult: this.data.finalResult,
          savePre: true,
          clearResult: false
        })
      }
      this.setData({
        resultText: this.data.resultText + "+"
      })
    },

    /**
     * 点击相减
     */
    operationMinus: function () {
      if (this.data.operationBtnsOn) {
        this.handleOperation();
        this.setData({
          operationBtnType: 'minus',
          savePre: true,
          clearResult: false
        })
      } else {
        this.setData({
          operationBtnsOn: true,
          operationBtnType: 'minus',
          preResult: this.data.finalResult,
          savePre: true,
          clearResult: false
        })
      }
      this.setData({
        resultText: this.data.resultText + "-"
      })
    },

    /**
     * 点击相乘
     */
    operationMultiply: function () {
      if (this.data.operationBtnsOn) {
        this.handleOperation();
        this.setData({
          operationBtnType: 'multiply',
          savePre: true,
          clearResult: false
        })
      } else {
        this.setData({
          operationBtnsOn: true,
          operationBtnType: 'multiply',
          preResult: this.data.finalResult,
          savePre: true,
          clearResult: false
        })
      }
      this.setData({
        resultText: this.data.resultText + "x"
      })
    },

    /**
     * 点击相除
     */
    operationDivide: function () {
      if (this.data.operationBtnsOn) {
        this.handleOperation();
        this.setData({
          operationBtnType: 'divide',
          savePre: true,
          clearResult: false
        })
      } else {
        this.setData({
          operationBtnsOn: true,
          operationBtnType: 'divide',
          preResult: this.data.finalResult,
          savePre: true,
          clearResult: false
        })
      }
      this.setData({
        resultText: this.data.resultText + "÷"
      })
    },

    /**
     * 处理连续计算
     */
    handleOperation() {
      if (this.data.operationBtnType == 'plus') {
        this.setData({
          finalResult: util.add(this.data.preResult, this.data.finalResult)
        })
        this.setData({
          preResult: this.data.finalResult,
        })
      }
      if (this.data.operationBtnType == 'minus') {
        this.setData({
          finalResult: util.sub(this.data.preResult, this.data.finalResult)
        })
        this.setData({
          preResult: this.data.finalResult,
        })
      }
      if (this.data.operationBtnType == 'multiply') {
        this.setData({
          finalResult: util.mul(this.data.preResult, this.data.finalResult)
        })
        this.setData({
          preResult: this.data.finalResult,
        })
      }
      if (this.data.operationBtnType == 'divide') {
        this.setData({
          finalResult: util.div(this.data.preResult, this.data.finalResult, this.data.figures)
        })
        this.setData({
          preResult: this.data.finalResult,
        })
      }
    },

    /**
     * 点击等于号
     */
    operationEquals: function () {
      if (this.data.operationBtnsOn) {
        if (this.data.operationBtnType == 'plus') {
          this.setData({
            operationBtnsOn: false,
            clearResult: true,
            savePre: false,
            finalResult: util.add(this.data.preResult, this.data.finalResult)
          })
        } else if (this.data.operationBtnType == 'minus') {
          this.setData({
            operationBtnsOn: false,
            clearResult: true,
            savePre: false,
            finalResult: util.sub(this.data.preResult, this.data.finalResult)
          })
        } else if (this.data.operationBtnType == 'multiply') {
          this.setData({
            operationBtnsOn: false,
            clearResult: true,
            savePre: false,
            finalResult: util.mul(this.data.preResult, this.data.finalResult)
          })
        } else if (this.data.operationBtnType == 'divide') {
          this.setData({
            operationBtnsOn: false,
            clearResult: true,
            savePre: false,
            finalResult: util.div(this.data.preResult, this.data.finalResult, this.data.figures)
          })
        }
      }
      if (this.data.resultText) {
        var resultText = this.data.resultText + "=" + this.data.finalResult;
        this.data.historyOperationList.push(resultText);
        this.setData({
          resultText: ''
        })
      }
      this.showHistory();
    },
    /**
     * 完成操作 提交数据判断
     */
    operationFinish: function () {
      console.log('点击完成的操作,把这个操作发送出去并且携带金额参数');
      //获取备注
      //获取支出中的某一个
      //获取存储的金额 finalResult 
      this.triggerEvent('getResultNum',{money:this.data.finalResult})
    },
    /**
     * 打印历史操作
     */
    showHistory: function () {
      console.log(this.data.historyOperationList)
    },

    //点击切换正负
    opposite: function () {
      if (this.data.savePre) {
        if (this.data.finalResult === "-0") {
          this.setData({
            finalResult: 0
          })
        } else {
          this.setData({
            finalResult: "-0"
          })
        }
      } else {
        if (this.data.finalResult === 0) {
          this.setData({
            finalResult: "-0"
          })
        } else {
          this.setData({
            finalResult: -this.data.finalResult
          })
        }
      }
    }
  }

})
