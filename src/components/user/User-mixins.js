export default {
    data() {
        // 定义邮箱规则
        var checkEmail = (rule, value, callback) => {
            var emailRule = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
            if(emailRule.test(value)){
                callback()
            }else{
                callback(new Error('邮箱格式不正确！'));
            }
        }
        // 定义手机号规则
        var checkMobile = (rule, value, callback) => {
            var mobileRule = /^1[3|4|5|8][0-9]\d{4,8}$/
            if (mobileRule.test(value)) {
                callback()
            } else {
                callback(new Error('手机号格式不正确！'));
            }
        }

      return {
          queryInfo: {
              query:'',
              pagenum: 1,
              pagesize: 6
          },
          userlist: [],
          total: 0,
          screenWidth: window.innerWidth,//浏览器宽度
          show:true,//判断条件
          addUserDialogVisible: false,
          addUserForm: {
              username: '',
              password: '',
              email: '',
              mobile: ''
          },
          addUserRules: {
              username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
              password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
              email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }, { validator: checkEmail, trigger: 'blur' }],
              mobile: [{ required: true, message: '请输入手机号', trigger: 'blur' }, { validator: checkMobile, trigger: 'blur' }]
          },
          editUserDialogVisible: false,
          editUserForm: {
            username: '',
            email: '',
            mobile: ''
        },
        editUserRules: {
            email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }, { validator: checkEmail, trigger: 'blur' }],
            mobile: [{ required: true, message: '请输入手机号', trigger: 'blur' }, { validator: checkMobile, trigger: 'blur' }]
        }
      };
    },
    created() {
        this.getUsersList()
    },
    methods: {
       async getUsersList() {
           const {data: res} = await this.$http.get('/users', {params: this.queryInfo})
        //    console.log(res)
           if (res.meta.status !== 200) return this.$message.error('获取用户列表失败！')
           this.userlist = res.data.users
           this.total = res.data.total
        },
        async changeState(userId, userStatus) {
            console.log(userId, userStatus)
            const {data: res} = await this.$http.put(`users/${userId}/state/${userStatus}`)
            console.log(res)
            if (res.meta.status !== 200) return this.$message.error('修改用户状态失败！')
        },
        handleSizeChange(newSize) {
            // console.log(newSize)
            this.queryInfo.pagesize = newSize
            this.getUsersList()
        },
        handleCurrentChange(currentPage) {
            // console.log(currentPage)
            this.queryInfo.pagenum = currentPage
            this.getUsersList()
        },
        resetAddUser() {
            this.$refs.addUserRef.resetFields()
            this.addUserDialogVisible = false
        },
        addUser() {
            this.$refs.addUserRef.validate(async valid => {
                if (!valid) return
                const {data: res} = await this.$http.post('/users', this.addUserForm)
                console.log(res)
                if (res.meta.status !== 201) return this.$message.error('添加用户失败！')
                this.$message.success('添加用户成功！')
                this.addUserDialogVisible = false
                this.getUsersList()
            })
        },
        async showEditUser(nowUserId) {
            // console.log(nowUserId)
            const {data: res} = await this.$http.get(`/users/${nowUserId}`)
            // console.log(res)
            if (res.meta.status !== 200) this.$message.error('查询用户失败！')
            this.editUserForm = res.data
            this.editUserDialogVisible = true
        },
        resetEditUser() {
            this.editUserForm = {}
            this.$refs.editUserRef.resetFields()
            this.editUserDialogVisible = false
        },
        saveEditUser() {
            this.$refs.editUserRef.validate(async valid => {
                if (!valid) return
                // const {data: res} = await this.$http.put('/users/'+this.editUserForm.id, {email: this.editUserForm.email,mobile: this.editUserForm.mobile})
                const {data: res} = await this.$http.put(`/users/${this.editUserForm.id}`, {email: this.editUserForm.email,mobile: this.editUserForm.mobile})
                // console.log(res)
                if (res.meta.status !== 200) this.$message.error('编辑用户失败！')
                this.$message.success('编辑用户成功！')
                this.editUserDialogVisible = false
                this.getUsersList()
            })
        },
        async removeUser(id) {
            // console.log(id)
            const confirmResult = await this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).catch(err => err)

              if (confirmResult !== 'confirm') 
              return this.$message({
                type: 'info',
                message: '已取消删除'
              }); 
              
              const {data: res} = await this.$http.delete(`/users/${id}`)
              console.log(res)
              if (res.meta.status !== 200) this.$message.error('删除用户失败！')
              this.$message.success('删除用户成功！')
              this.getUsersList()
        }
    },
    mounted(){
        const that = this;
        window.onresize = ()=>{
            return (()=>{
                window.screenWidth = window.innerWidth
                        that.screenWidth = window.screenWidth;
            })()
        }
    },
    watch: {
        screenWidth(val) {
            this.screenWidth = val
            // console.log(this.screenWidth)
            if(this.screenWidth<1919){
                this.show = false
            }else{
                this.show = true
            }
        }
    }
  };