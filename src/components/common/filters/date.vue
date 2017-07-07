<template>
  	<div class="template-date-container">
  		<label class="title" for="title">时间类型：</label>
        <div class="wrap filter-content">
            <div class="date-classify">
                <Button-group>
                    <Button
                        :type="type === 1 ? 'primary' : 'ghost'"
                        @click="checkdategenre(1)">
                        <Tooltip content="最多选择一整月" placement="top" style="top: 20px;">
                            日
                        </Tooltip>
                    </Button>
                    <Button
                        :type="type === 2 ? 'primary' : 'ghost'"
                        @click="checkdategenre(2)">
                        <Tooltip content="最多选择三个月" placement="top" style="top: 20px;">
                            月
                        </Tooltip>
                    </Button>
                    <Button
                        :type="type === 3 ? 'primary' : 'ghost'"
                        @click="checkdategenre(3)">
                        <Tooltip content="最多选择一年" placement="top" style="top: 20px;">
                            年
                        </Tooltip>
                    </Button>
                </Button-group>
            </div>
            <div v-show="type === 1" class="date-picker">
                <Date-picker
                    type="date"
                    placeholder="开始时间"
                    @on-change="datechange"
                    :options="daterules"
                    style="width: 150px">
                </Date-picker>
                <Date-picker
                    type="date"
                    placeholder="结束时间"
                    @on-change="datechange"
                    :options="daterules"
                    style="width: 150px;margin-left: 5px;">
                </Date-picker>
            </div>
            <div v-show="type === 2" class="date-picker">
                <Date-picker
                    type="month"
                    placeholder="开始时间"
                    @on-change="datechange"
                    :options="daterules"
                    style="width: 150px">
                </Date-picker>
                <Date-picker
                    type="month"
                    placeholder="结束时间"
                    @on-change="datechange"
                    :options="daterules"
                    style="width: 150px;margin-left: 5px;">
                </Date-picker>
            </div>
            <div v-show="type === 3" class="date-picker">
                <Date-picker
                    type="year"
                    placeholder="开始时间"
                    style="width: 150px">
                </Date-picker>
            </div>
        </div>
  	</div>
</template>

<script type="text/ecmascript-6">
    import {string2timestamp} from 'src/utils/format'

  	export default {
        data () {
            return {
                type: 1,    //1.日 2.月 3.年
                starttime: '',
                endtime: '',
                daterules: {
                    disabledDate (date) {
                        return date && date.valueOf() > Date.now()
                    }
                }
            }
        },
        methods: {
            checkdategenre(date_type) {
                if(date_type === this.type) return

                this.type = date_type
            },
            datechange(date) {
                console.log(string2timestamp(date))
            }
        },
        computed: {
            // checkdategenre: (date_type) => {
            //     return this.type = date_type
            // }
        }
    }
</script>

<style scoped lang="less" rel="stylesheet/less">
  	.template-date-container{
  		.title {
            font-size: 14px;
            width: 75px;
            display: inline-block;
        }
        .wrap {
            font-size: 12px;
            display: inline-block;
            .date-classify,.date-picker {
                display: inline-block;
            }
            .date-picker {
                margin-left: 15px;
            }
            .date-classify .ivu-tooltip-popper {
                top: 10px !important;
            }
        }
  	}
</style>
