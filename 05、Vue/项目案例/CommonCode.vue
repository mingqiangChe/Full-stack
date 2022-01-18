<template>
  <div>
    <a-col :md="6" :sm="24" class="title" style="margin-right:20px;" >
      <a-input style="margin-bottom: 8px" placeholder="查询" @change="inputOnChange" v-show="true" :maxLength="maxLength"/>

      <a-tree
        :tree-data="gData"
        :replace-fields="replaceFields"
        :selectable="true"
        @select="handleDetail"
        v-if="gData.length"
        :expanded-keys="expandedKeys"
        @expand="onExpand"
        :auto-expand-parent="autoExpandParent"
      >
        <template slot="title" slot-scope="{ title }">
          <span v-if="title.indexOf(searchValue) > -1">
            {{ title.substr(0, title.indexOf(searchValue)) }}
            <span style="color: #1890FF">{{ searchValue }}</span>
            {{ title.substr(title.indexOf(searchValue) + searchValue.length) }}
          </span>
          <span v-else>{{ title }}</span>
        </template>
      </a-tree>
    </a-col>
    <a-col :md="17" :sm="24" class="title">
      <a-button type="primary" :disabled="add" style="margin-left: 5px;margin-bottom:10px;" @click="handleAdd()">新增</a-button>
      <a-button type="primary" @click="showActive" style="margin-left: 10px">数据字典动态</a-button>
      <a-table
        :columns="columns"
        :data-source="detailList"
        @change="treeOnChange"
        :loading="listLoading"
        :row-key="'id'"
        style="margin-left: 5px">
        <span slot="action" slot-scope=" text,record" v-show="!record.original">
          <template >
            <a-icon type="edit" title="编辑" :style="{color:statusColor.success,fontSize:iconSize}" @click="handleEdit(record)"/>
            <a-divider type="vertical"></a-divider>
          </template>
          <template>
            <a-icon type="delete" title="删除" :style="{color:statusColor.error, fontSize:iconSize}" @click="handleDel(record)" />
          </template>
        </span>
      </a-table>
    </a-col>
    <edit-modal ref="editModal" @ok="handleOk"/>
    <a-modal
      title="数据字典动态"
      :visible="activeModal"
      :footer="null"
      @cancel="() => {this.activeModal = false}"
      width="80%"
      :maskClosable="false"
    >
      <History :reference-options="referenceOptions" ref="history"/>
    </a-modal>
  </div>
</template>
<script>
import { getDetailList, getCodeList, delCommonCode, getTreeDetailList } from '@/api/common_code/commonCode'
import { maxLength, iconSize, statusColor, dateTimeStandard, bizType } from '@/utils/globalAttr'
import editModal from './Edit'
import History from '@/components/HistoryDynamic'
import { historyDynamic, getActionType } from '@/api/enum'
import moment from 'moment'

export default {
  components: {
    editModal,
    History
  },
  data () {
    return {
      dateTimeStandard,
      referenceOptions: {
        // form查询条件，根据类型进行不同显示
        formList: [{
          type: 'select',
          name: '操作类型',
          code: 'actionType',
          operator: 'EQ',
          list: []
        }],
        // list获取方法
        renderlist: historyDynamic,
        bizType: bizType.COMMON_CODE,
        columns: [
          {
            class: 'formHeaderColor',
            title: '原值',
            children: [{
              title: '公共代码名称',
              class: 'formHeaderColor',
              dataIndex: 'oldObject.name',
              align: 'center'
            }, {
              title: '下拉框编码',
              class: 'formHeaderColor',
              dataIndex: 'oldObject.code',
              align: 'center'
            }, {
              title: '详情',
              class: 'formHeaderColor',
              dataIndex: 'oldName',
              scopedSlots: { customRender: 'oldName' },
              align: 'center'
            }]
          },
          {
            title: '变化值',
            children: [{
              title: '公共代码名称',
              dataIndex: 'newObject.name',
              align: 'center'
            }, {
              title: '下拉框编码',
              dataIndex: 'newObject.code',
              align: 'center'
            }, {
              title: '详情',
              dataIndex: 'newName',
              scopedSlots: { customRender: 'newName' },
              align: 'center'
            }]
          },
          {
            title: '操作时间',
            align: 'center',
            dataIndex: 'actionedTime',
            customRender: (time) => time ? moment(time).format(this.dateTimeStandard) : ''
          },
          {
            title: '操作类型',
            dataIndex: 'actionType.name',
            align: 'center',
            width: 120
          }
        ]
      },
      // 动态页面弹窗
      activeModal: false,
      add: true,
      maxLength,
      id: '',
      code: '',
      iconSize,
      statusColor,
      name: '',
      // 高级搜索 展开/关闭
      advanced: false,
      // 分页数据
      page: {
        page: 1,
        size: 10,
        totalPages: 0
      },
      // 查询参数
      queryParam: {},
      recordqueryParam: {},
      listLoading: false,
      pagination: {
        showTotal: function (totalSize) {
          return '总共 ' + totalSize + ' 条记录'
        },
        showSizeChanger: true,
        showQuickJumper: true,
        pageSizeOptions: ['10', '20', '50', '100']
      },
      defaultExpandKeys: [],
      detailList: [],
      expandedKeys: [1],
      searchValue: '',
      autoExpandParent: true,
      gData: [],
      dataList: [],
      recordList: [],
      defaultSelectedKeys: [31],
      replaceFields: {
        key: 'id'
      },
      columns: [
        {
          title: '名称',
          dataIndex: 'name',
          align: 'center'
        },
        {
          title: '编码',
          dataIndex: 'code',
          align: 'center'
        },
        {
          title: '操作',
          dataIndex: 'action',
          align: 'center',
          scopedSlots: { customRender: 'action' }
        }

      ]
    }
  },
  methods: {
    showActive () {
      this._getActionType()
      this.activeModal = true
      this.$nextTick(() => {
        this.$refs.history.queryList()
      })
    },
    onExpand (expandedKeys) {
      this.expandedKeys = expandedKeys
      this.autoExpandParent = false
    },
    handleDetail (selectedKeys, e) {
      const param = {
        id: selectedKeys[0]
      }
      this.add = !selectedKeys[0] > 0
      if (!this.add) {
        this.id = e.selectedNodes[0].data.props.id
        this.name = e.selectedNodes[0].data.props.name
        this.code = e.selectedNodes[0].data.props.code
      }
      this.getLevelDetail(param)
    },
    treeOnChange (e) {
      const value = e.target.value
      const param = { name: value }
      this._detailList(param)
    },
    inputOnChange (e) {
      const value = e.target.value
      const expandedKeys = this.recordList
        .map(item => {
          if (item.name.indexOf(value) > -1) {
            return this.getParentKey(item.id, this.gData)
          }
          return null
        })
        .filter((item, i, self) => item && self.indexOf(item) === i)
      Object.assign(this, {
        expandedKeys,
        searchValue: value,
        autoExpandParent: true
      })
      // 输入框空时展开父节点
      if (!value) {
        this.expandedKeys = [1]
      }
    },
    getParentKey (id, tree) {
      let parentKey
      for (let i = 0; i < tree.length; i++) {
        const node = tree[i]
        if (node.children) {
          if (node.children.some(item => {
            return item.id === id
          })) {
            parentKey = node.id
          } else if (this.getParentKey(id, node.children)) {
            parentKey = this.getParentKey(id, node.children)
          }
        }
      }
      return parentKey
    },
    // 对所有数据进行title的slots
    renderSlots (data) {
      const datas = data
      const render = (list) => {
        for (const i in list) {
          list[i]['title'] = list[i].name
          list[i]['scopedSlots'] = { title: 'title' }
          if (list[i].children && list[i].children.length > 0) {
            render(list[i].children)
          }
        }
      }
      render(datas)
      return datas
    },
    _renderList () {
      const param = {
        'data': {
          'code': 'area'
        }
      }
      getDetailList(param).then(res => {
        if (!res.success) {
          this.$notification['error']({
            message: res.message
          })
          this.listLoading = false
          return
        }
        const page = { ...this.pagination }
        page.total = res.data.totalSize
        page.current = res.data.currentPage
        this.gData = this.renderSlots(res.data)
        this.dataList = res.data
        this.listLoading = false
        this.pagination = page
        this.defaultExpandKeys.push(res.data[0].id)
      })
    },
    _detailList (param) {
    //  param.id = param.id === 'undefined' ? 1 : param.id
      getTreeDetailList({ data: { id: param.id } }).then(res => {
        if (!res.success) {
          this.$notification['error']({
            message: res.message
          })
          this.listLoading = false
          return
        }
        const page = { ...this.pagination }
        page.total = res.data.totalSize
        page.current = res.data.currentPage
        this.detailList = res.data
        this.listLoading = false
        this.pagination = page
      })
    },
    getLevelDetail (param) {
      getTreeDetailList({ data: { id: param.id } }).then(res => {
        if (!res.success) {
          this.$notification['error']({
            message: res.message
          })
          this.listLoading = false
          return
        }
        const page = { ...this.pagination }
        page.total = res.data.totalSize
        page.current = res.data.currentPage
        this.detailList = res.data
        this.listLoading = false
        this.pagination = page
      })
    },
    _codeList (parameter) {
      getCodeList(parameter).then(res => {
        if (!res.success) {
          this.$notification['error']({
            message: res.message
          })
          this.listLoading = false
          return
        }
        this.recordList = res.data
        this.listLoading = false
      })
    },
    handleEdit (record) {
      this.$refs.editModal.update(record)
    },
    handleAdd () {
      const record = {
        data: {
          pid: this.id,
          pCode: this.code,
          pName: this.name
        }
      }
      this.$refs.editModal.add(record)
    },
    handleDel (record) {
      this.$confirm({
        title: '请确认操作？',
        content: '请确认删除' + record.name + ' ?',
        okType: 'danger',
        onOk: () => {
          delCommonCode(record.id).then(res => {
            if (res.success) {
              this.$notification['success']({
                message: res.message || '删除成功'
              })
            } else {
              this.$notification['warning']({
                message: res.message || '删除失败'
              })
            }
            this._detailList({ id: this.id })
            this._renderList()
          })
        }
      })
    },
    handleOk () {
      this._renderList()
      this._codeList()
      this._detailList({ id: this.id })
    },
    _getActionType () {
      getActionType().then((res) => {
        if (res.success) {
          for (let i = 0; i < this.referenceOptions.formList.length; i++) {
            if (this.referenceOptions.formList[i].code === 'actionType') {
              this.referenceOptions.formList[i].list = res.data
              break
            }
          }
        }
      })
    }
  },
  created () {
    this._renderList()
    this._codeList()
    this._detailList({ id: 1 })
  }

}
</script>
<style scoped>
  .ant-layout-content{
    background:#f0f2f5;
  }
  .title{
    background:#fff;
    padding:10px 20px;
    border-radius:4px;
  }
</style>
