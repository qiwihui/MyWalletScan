import {
    Button,
    Input,
    Space,
    Table,
    Modal,
    Form,
    notification,
    Spin,
    Tag,
    Popconfirm,
    Row, Col, InputNumber, Badge, message, Switch, Pagination
} from 'antd';
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons"
import {
    getEthBalance,
    getTxCount,
    getZksEra,
    getZksLite,
    getZkSyncBridge,
    exportToExcel,
    calculateScore,
    getDebankValue
} from "@utils"
import {useEffect, useState} from "react";
import './index.css';
import {Layout, Card} from 'antd';
import { ethers } from 'ethers';

const {Content} = Layout;
import {
    DeleteOutlined,
    DownloadOutlined,
    EditOutlined,
    PlusOutlined, SettingOutlined,
    SyncOutlined,
    UploadOutlined
} from "@ant-design/icons";

const {TextArea} = Input;

function Assets() {
    const [batchProgress, setBatchProgress] = useState(0);
    const [batchLength, setBatchLength] = useState(0);
    const [batchloading, setBatchLoading] = useState(false);
    const [zkSyncConfigStore, setZkSyncConfigStore] = useState({});
    const [data, setData] = useState([]);
    const [isBatchModalVisible, setIsBatchModalVisible] = useState(false);
    const [isWalletModalVisible, setIsWalletModalVisible] = useState(false);
    const [batchForm] = Form.useForm();
    const [walletForm] = Form.useForm();
    const [selectedKeys, setSelectedKeys] = useState([]);
    const [form] = Form.useForm();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isAddLoading, setIsAddLoading] = useState(false);
    const [tableLoading, setTableLoading] = useState(false);
    const [hideColumn, setHideColumn] = useState(false);
    const [scoreData, setScoreData] = useState([]);
    const [tableHeight, setTableHeight] = useState(0);
    const [latestVersion, setLatestVersion] = useState('');
    const [commitMessage, setCommitMessage] = useState('');

    const toggleHideColumn = () => {
        setHideColumn(!hideColumn);
      };

    const getEyeIcon = () => {
    if (hideColumn) {
        return <EyeInvisibleOutlined />;
    }
    return <EyeOutlined />;
    };

    useEffect(() => {
      // Function to fetch the latest version from GitHub API
      const fetchLatestVersion = () => {
        const url = "https://api.github.com/repos/luoyeETH/MyWalletScan/commits?per_page=1";
        fetch(url)
          .then(res => res.json())
          .then(res => {
            const version = res[0].sha;
            const message = res[0].commit.message;
            setLatestVersion(version);
            setCommitMessage(message);
          })
          .catch(error => {
            console.error('Error fetching latest version:', error);
          });
      };
  
      // Fetch the latest version on component mount
      fetchLatestVersion();
  
      // Schedule fetching the latest version every 10 mins
      const interval = setInterval(fetchLatestVersion, 600000);
  
      // Clean up the interval on component unmount
      return () => clearInterval(interval);
    }, []);
  
    // Function to compare the latest version with the locally stored version
    const checkVersion = () => {
      const locallyStoredVersion = localStorage.getItem('version');
      if (locallyStoredVersion && latestVersion && locallyStoredVersion !== latestVersion) {
        // Perform actions when a new version is available
        notification.info({
            message: '检查到页面有新的版本! 请刷新',
            description: (
                <div>
                    {commitMessage}
                    <br />
                    {locallyStoredVersion.substring(0, 7)} -{'>'} {latestVersion.substring(0, 7)}
                </div>
            ),
            duration: 0,
        });
        localStorage.setItem('version', latestVersion);
      }
    };
  
    // Call the checkVersion function on component mount and whenever the latestVersion state changes
    useEffect(checkVersion, [latestVersion]);

    useEffect(() => {
        const handleResize = () => {
            setTableHeight(window.innerHeight - 210); // 减去其他组件的高度，如页眉、页脚等
        };
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
        window.removeEventListener('resize', handleResize);
    };
    }, []);

    useEffect(() => {
        setBatchProgress(0);
        const zksync_config = localStorage.getItem('zksync_config');
        if (zksync_config) {
            const config = JSON.parse(zksync_config);
            setZkSyncConfigStore(config);
            walletForm.setFieldsValue(config);
        } else {
            setZkSyncConfigStore(
                {
                    "ETHTx": null,
                    "zkSyncLiteMinTx": null,
                    "zkSyncEraMinTx": null,
                    "zkSyncEraValue": null,
                    "dayMin": null,
                    "weekMin": null,
                    "monthMin": null,
                    "L1ToL2Tx": null,
                    "L2ToL1Tx": null,
                    "L1ToL2ETH": null,
                    "L2ToL1ETH": null,
                    "gasFee": null,
                    "contractMin": null,
                    "totalAmount": null,
                }
            )
        }
    }, []);
    const handleOk = async () => {
        try {
            const values = await form.validateFields();
            if (values.address.length !== 42) {
                notification.error({
                    message: "错误",
                    description: "请输入正确的地址",
                }, 2);
                return;
            }
            setIsAddLoading(true);
            setIsModalVisible(false);
            const index = data.findIndex(item => item.address === values.address);
            if (index !== -1) {
                setData(data.map((item, i) => {
                    if (i === index) {
                        return {
                            ...item,
                            name: values.name,
                        }
                    }
                    return item;
                }));
                let wallets = [{name: values.name, address: data[index].address}]
                const newData = await handleFetchingWallets(wallets, [...data])
                setData(newData);
                localStorage.setItem('addresses', JSON.stringify(newData));
            } else {
                const newEntry = {
                    key: data.length.toString(),
                    name: values.name,
                    address: values.address,
                    // eth
                    eth_balance: null,
                    eth_usdc_balance: null,
                    eth_usdt_balance: null,
                    eth_tx_amount: null,
                    // arb
                    arb_balance: null,
                    arb_usdc_balance: null,
                    arb_usdt_balance: null,
                    // zks era
                    zks2_balance: null,
                    zks2_tx_amount: null,
                    zks2_usdc_balance: null,
                    zks2_usdt_balance: null,
                    // zks lite
                    zks1_balance: null,
                    zks1_tx_amount: null,
                };
                let wallets = [{name: values.name, address: values.address}]
                const newData = await handleFetchingWallets(wallets, [...data, newEntry])
                setData(newData);
                localStorage.setItem('addresses', JSON.stringify(newData));
            }
        } catch (error) {
            notification.error({
                message: "错误",
                description: error.message,
            }, 2);
        } finally {
            setIsAddLoading(false);
            form.resetFields();
        }
    }
    const handleRefresh = async () => {
        if (!selectedKeys.length) {
            notification.error({
                message: "错误",
                description: "请先选择要刷新的地址",
            }, 2);
            return;
        }
        setIsLoading(true);
        try {
            const wallets = selectedKeys.map(key => {
                const index = data.findIndex(item => item.key === key);
                return {name: data[index].name, address: data[index].address}
            })
            const newData = await handleFetchingWallets(wallets, [...data])
            setData(newData);
            localStorage.setItem('addresses', JSON.stringify(newData));
        } catch (error) {
            notification.error({
                message: "错误",
                description: error.message,
            }, 2);
        } finally {
            setIsLoading(false);
            setSelectedKeys([]);
            message.success("刷新成功");
        }
    };

    const handleFetchingWallets = async (wallets, newData) => {
        const addresses = wallets.map(obj => obj.address);
        const names = wallets.map(obj => obj.name);

        const limit = 50;
        let promisesQueue = [];
        let activePromises = 0;
        const processQueue = () => {
            while (promisesQueue.length > 0 && activePromises < limit) {
                const promise = promisesQueue.shift();
                activePromises += 1;

                promise().finally(() => {
                    activePromises -= 1;
                    processQueue();
                });
            }
        };
        for (let address of addresses) {
            address = address.trim();
            if (address.length !== 42) {
                continue;
            }
            let note = names[addresses.indexOf(address)];
            let promiseWithProgress = () => {
                return new Promise((resolve, reject) => {
                    setBatchProgress(prevProgress => prevProgress + 1);
                    resolve();
                });
            };
            const index = newData.findIndex(item => item.address === address);
            const item = index !== -1 ? newData[index] : {
                key: newData.length.toString(),
                address: address,
                name: note,
                // eth
                eth_balance: null,
                eth_usdc_balance: null,
                eth_usdt_balance: null,
                eth_tx_amount: null,
                // arb
                arb_balance: null,
                arb_usdc_balance: null,
                arb_usdt_balance: null,
                // zks era
                zks2_balance: null,
                zks2_tx_amount: null,
                zks2_usdc_balance: null,
                zks2_usdt_balance: null,
                // zks lite
                zks1_balance: null,
                zks1_tx_amount: null,
            };
            if (index === -1) {
                newData.push(item);
            }
            promisesQueue.push(() => {
                item.zks2_balance = null;
                item.zks2_usdc_balance = null;
                item.zks2_usdt_balance = null;
                return getZksEra(item.address).then(({balance2, usdcBalance, usdtBalance}) => {
                    item.zks2_balance = balance2;
                    item.zks2_usdc_balance = usdcBalance;
                    item.zks2_usdt_balance = usdtBalance;
                    setData([...newData]);
                    localStorage.setItem('addresses', JSON.stringify(newData));
                })
            });

            promisesQueue.push(() => {
                item.zks1_balance = null;
                item.zks1_tx_amount = null;
                return getZksLite(address).then(({balance1, tx1}) => {
                    item.zks1_balance = balance1;
                    item.zks1_tx_amount = tx1;
                    setData([...newData]);
                    localStorage.setItem('addresses', JSON.stringify(newData));
                })
            });

            promisesQueue.push(() => {
                item.eth_balance = null;
                return getEthBalance(address, "ethereum").then((eth_balance) => {
                    item.eth_balance = eth_balance;
                    setData([...newData]);
                    localStorage.setItem('addresses', JSON.stringify(newData));
                });
            });

            promisesQueue.push(() => {
                item.arb_balance = null;
                return getEthBalance(address, "arbitrum").then((eth_balance) => {
                    item.arb_balance = eth_balance;
                    setData([...newData]);
                    localStorage.setItem('addresses', JSON.stringify(newData));
                });
            });

            promisesQueue.push(() => {
                item.eth_tx_amount = null;
                return getTxCount(address, "ethereum").then((eth_tx_amount) => {
                    item.eth_tx_amount = eth_tx_amount;
                    setData([...newData]);
                    localStorage.setItem('addresses', JSON.stringify(newData));
                });
            });
            promisesQueue.push(promiseWithProgress);
            processQueue();
        }
        while (activePromises > 0 || promisesQueue.length > 0) {
            await new Promise(resolve => setTimeout(resolve, 100));
        }
        return newData
    }

    const handleBatchOk = async () => {
        try {
            setBatchLoading(true);
            setIsBatchModalVisible(false);
            const values = await batchForm.validateFields();
            const addressLines = values.addresses.split("\n");
            const wallets = addressLines.map(line => {
                const [address, name] = line.split(",");
                return { address: address.trim(), name: name ? name.trim() : ''  };
              });
            const addresses = wallets.map(obj => obj.address);
            // check address
            const names = wallets.map(obj => obj.name);
            setBatchLength(addresses.length);
            const oldData = [...data];
            const newData = await handleFetchingWallets(wallets, oldData)
            setData(newData);
            localStorage.setItem('addresses', JSON.stringify(newData));
        } catch (error) {
            notification.error({
                message: "错误",
                description: error.message,
            });
        } finally {
            setBatchLoading(false);
            setBatchProgress(0);
            batchForm.resetFields();
            setSelectedKeys([]);
            message.success("批量添加成功");
        }
    };

    const showModal = () => {
        setIsModalVisible(true);
    };
    const showBatchModal = () => {
        setIsBatchModalVisible(true);
    };
    const exportToExcelFile = () => {
        exportToExcel(data, 'walletInfo');
    }
    useEffect(() => {
        setTableLoading(true);
        const storedAddresses = localStorage.getItem('addresses');
        setTimeout(() => {
            setTableLoading(false);
        }, 500);
        if (storedAddresses) {
            setData(JSON.parse(storedAddresses));
            setScoreData(JSON.parse(storedAddresses));
        }
    }, []);
    useEffect(() => {
        const newData = [...data];
      
        for (const item of newData) {
          setTimeout(async () => {
            const score = await calculateScore(item);
            item.zk_score = score;
            
            // 检查是否所有数据的评分都已计算完成
            const allScoresCalculated = newData.every(item => item.zk_score !== undefined);
            
            if (allScoresCalculated) {
              setData(newData);
            }
          }, 0);
        }
      }, [scoreData]);
    const handleCancel = () => {
        setIsModalVisible(false);
    };
    const handleDelete = (key) => {
        setData(data.filter(item => item.key !== key));
        localStorage.setItem('addresses', JSON.stringify(data.filter(item => item.key !== key)));
    }
    const handleDeleteSelected = () => {
        if (!selectedKeys.length) {
            notification.error({
                message: "错误",
                description: "请先选择要删除的地址",
            }, 2);
            return;
        }
        setData(data.filter(item => !selectedKeys.includes(item.key)));
        localStorage.setItem('addresses', JSON.stringify(data.filter(item => !selectedKeys.includes(item.key))));
        setSelectedKeys([]);
    }
    const rowSelection = {
        selectedRowKeys: selectedKeys,
        onChange: (selectedRowKeys) => {
            setSelectedKeys(selectedRowKeys);
        },
    };
    const handleBatchCancel = () => {
        setIsBatchModalVisible(false);
    };
    const [editingKey, setEditingKey] = useState(null);
    const columns = [
        {
            title: "#",
            key: "index",
            align: "center",
            render: (text, record, index) => index + 1,
            width: 40,
        },
        {
            title: "备注",
            dataIndex: "name",
            key: "name",
            align: "center",
            render: (text, record) => {
                const isEditing = record.key === editingKey;
                return isEditing ? (
                    <Input
                        placeholder="请输入备注"
                        defaultValue={text}
                        onPressEnter={(e) => {
                            record.name = e.target.value;
                            setData([...data]);
                            localStorage.setItem('addresses', JSON.stringify(data));
                            setEditingKey(null);
                        }}
                    />
                ) : (
                    <>
                        <Tag color="blue" onClick={() => setEditingKey(record.key)}>
                            {text}
                            </Tag>
                            {!text && (
                            <Button
                                shape="circle"
                                icon={<EditOutlined />}
                                size="small"
                                onClick={() => setEditingKey(record.key)}
                            />
                        )}
                    </>
                );
            },
            width: 75
        },
        {
            title: (
                <span>
                钱包地址
                    <span onClick={toggleHideColumn} style={{ marginLeft: 8, cursor: 'pointer' }}>
                        {getEyeIcon()}
                    </span>
                </span>
            ),
            dataIndex: "address",
            key: "address",
            align: "center",
            render: (text, record) => {
                if (hideColumn) {
                    return '***';
                  }
                return isRowSatisfyCondition(record) ?
                    <div
                        style={{backgroundColor: '#bbeefa', borderRadius: '5px'}}
                    >
                        {text}</div> : text ||
                    <Spin/>;
            },
            width: 168
        },
        {
            title: "Ethereum",
            key: "eth_group",
            className: "eth",
            children: [
                {
                    title: "ETH",
                    dataIndex: "eth_balance",
                    key: "eth_balance",
                    align: "center",
                    sorter: (a, b) => a.eth_balance - b.eth_balance,
                    render: (text, record) => (text === null ? <Spin/> : text),
                    width: 60
                },
                {
                    title: "USDC",
                    dataIndex: "eth_usdcBalance",
                    key: "eth_usdcBalance",
                    align: "center",
                    render: (text, record) => (text === null ? <Spin/> : text),
                    width: 60
                },
                {
                    title: "USDT",
                    dataIndex: "eth_usdtBalance",
                    key: "eth_usdtBalance",
                    align: "center",
                    render: (text, record) => (text === null ? <Spin/> : text),
                    width: 60
                },
            ],
        },
        {
            title: "Arbitrum",
            key: "arb_group",
            className: "arb_eth",
            children: [
                {
                    title: "ETH",
                    dataIndex: "arb_balance",
                    key: "arb_balance",
                    align: "center",
                    sorter: (a, b) => a.arb_balance - b.arb_balance,
                    render: (text, record) => (text === null ? <Spin/> : text),
                    width: 60
                },
                {
                    title: "USDC",
                    dataIndex: "arb_usdcBalance",
                    key: "arb_usdtcBalance",
                    align: "center",
                    render: (text, record) => (text === null ? <Spin/> : text),
                    width: 60
                },
                {
                    title: "USDT",
                    dataIndex: "arb_usdtBalance",
                    key: "arb_usdtBalance",
                    align: "center",
                    render: (text, record) => (text === null ? <Spin/> : text),
                    width: 60
                },
            ],
        },
        {
            title: "zkSyncLite",
            key: "zks_lite_group",
            className: "zks_lite",
            children: [
                {
                    title: "ETH",
                    dataIndex: "zks1_balance",
                    key: "zks1_balance",
                    align: "center",
                    render: (text, record) => (text === null ? <Spin/> : text),
                    width: 60
                },
                {
                    title: "Tx",
                    dataIndex: "zks1_tx_amount",
                    key: "zks1_tx_amount",
                    align: "center",
                    render: (text, record) => (text === null ? <Spin/> : text),
                    width: 34.5
                },
            ],
        },
        {
            title: "zkSync Era",
            key: "zks_era_group",
            className: "zks_era",
            children: [
                {
                    title: "ETH",
                    dataIndex: "zks2_balance",
                    key: "zks2_balance",
                    align: "center",
                    render: (text, record) => (text === null ? <Spin/> : text),
                    width: 60
                },
                {
                    title: "USDC",
                    dataIndex: "zks2_usdc_balance",
                    key: "zks2_usdc_balance",
                    align: "center",
                    render: (text, record) => (text === null ? <Spin/> : text),
                    width: 60
                },
                {
                    title: "USDT",
                    dataIndex: "zks2_usdt_balance",
                    key: "zks2_usdt_balance",
                    align: "center",
                    render: (text, record) => (text === null ? <Spin/> : text),
                    width: 60
                }
            ],
        },
        {
            title: "操作",
            key: "action",
            align: "center",
            render: (text, record) => (
                <Space size="small">
                    <Popconfirm title={"确认删除？"} onConfirm={() => handleDelete(record.key)}>
                        <Button icon={<DeleteOutlined/>}/>
                    </Popconfirm>
                </Space>
            ),
            width: 50
        },
    ];
    const handleWalletOk = () => {
        const values = walletForm.getFieldsValue();
        localStorage.setItem('zksync_config', JSON.stringify(values));
        setZkSyncConfigStore(values);
        setIsWalletModalVisible(false);
        console.log(zkSyncConfigStore)
    };
    const FormItem = ({name, addonBefore, addonAfter}) => (
        <Form.Item name={name}>
            <InputNumber min={0} style={{width: '100%'}}
                         addonBefore={addonBefore} addonAfter={addonAfter}
            />
        </Form.Item>
    );
    const isRowSatisfyCondition = (record) => {
        const conditionKeyMapping = {
            "ETHTx": "eth_tx_amount",
            "zkSyncLiteMinTx": "zks1_tx_amount",
            "zkSyncEraMinTx": "zks2_tx_amount",
            "zkSyncEraValue": "zks2_balance",
            "L1ToL2Tx": "l1Tol2Times",
            "L2ToL1Tx": "l2Tol1Times",
            "L1ToL2ETH": "l1Tol2Amount",
            "L2ToL1ETH": "l2Tol1Amount",
            "contractMin": "contractActivity",
            "dayMin": "dayActivity",
            "weekMin": "weekActivity",
            "monthMin": "monthActivity",
            "gasFee": "totalFee",
            "totalAmount": "totalExchangeAmount",
        };
        return Object.keys(conditionKeyMapping).every((conditionKey) => {
            if (!(conditionKey in zkSyncConfigStore) || zkSyncConfigStore[conditionKey] === null || zkSyncConfigStore[conditionKey] === undefined) {
                return true;
            }
            const recordKey = conditionKeyMapping[conditionKey];
            return Number(record[recordKey]) >= Number(zkSyncConfigStore[conditionKey])
        });
    };

    return (
        <div>
            <Content>
                <Modal title="批量添加地址" open={isBatchModalVisible} onOk={handleBatchOk}
                       onCancel={handleBatchCancel}
                       okButtonProps={{loading: isLoading}}
                       okText={"添加地址"}
                       cancelText={"取消"}
                    // style={{zIndex: 3}}
                >
                    <Form form={batchForm} layout="vertical">
                        <Form.Item label="地址" name="addresses" rules={[{required: true}]}>
                            <TextArea placeholder="请输入地址，每行一个  要添加备注时放在地址后以逗号(,)间隔" style={{width: "500px", height: "200px"}}/>
                        </Form.Item>
                    </Form>
                </Modal>
                <Modal title="添加地址" open={isModalVisible} onOk={handleOk} onCancel={handleCancel}
                       okButtonProps={{loading: isLoading}}
                       okText={"添加地址"}
                       cancelText={"取消"}
                    // style={{zIndex: 3}}
                >
                    <Form form={form} layout="vertical">
                        <Form.Item label="地址" name="address" rules={[{required: true}]}>
                            <Input placeholder="请输入地址"/>
                        </Form.Item>
                        <Form.Item label="备注" name="name">
                            <Input placeholder="请输入备注"/>
                        </Form.Item>
                    </Form>
                </Modal>
                <Modal title="zkSync"
                       open={isWalletModalVisible}
                       onOk={handleWalletOk}
                       onCancel={() => {
                           setIsWalletModalVisible(false);
                       }}
                       okText={"保存"}
                       cancelText={"取消"}
                       width={700}
                       style={{top: 10}}
                    // style={{zIndex: 3}}

                >
                    <Form form={walletForm} layout="vertical">
                        <Card title="设置钱包预期标准，若钱包达到设置标准，钱包地址背景会为蓝色，更清晰"
                              bordered={true}
                              style={{width: '100%'}}>
                            <Row gutter={[16, 16]}>
                                <Col span={12}>
                                    <FormItem name="ETHTx" addonBefore="ETH Tx数量 ≥ "
                                              addonAfter="个"/>
                                    <FormItem name="zkSyncLiteMinTx" addonBefore="zkSyncLite Tx数量 ≥ "
                                              addonAfter="个"/>
                                    <FormItem name="zkSyncEraMinTx" addonBefore="zkSyncEra Tx数量 ≥ "
                                              addonAfter="个"/>
                                    <FormItem name="zkSyncEraValue" addonBefore="zkSyncEra 余额 ≥ "
                                              addonAfter="ETH"/>
                                    <FormItem name="dayMin" addonBefore="日活跃数 ≥ " addonAfter="天"/>
                                    <FormItem name="weekMin" addonBefore="周活跃数 ≥ " addonAfter="周"/>
                                    <FormItem name="monthMin" addonBefore="月活跃数 ≥ " addonAfter="月"/>
                                </Col>
                                <Col span={12}>
                                    <FormItem name="L1ToL2Tx" addonBefore="L1->L2跨链Tx ≥ " addonAfter="个"/>
                                    <FormItem name="L2ToL1Tx" addonBefore="L2->L1跨链Tx ≥ " addonAfter="个"/>
                                    <FormItem name="L1ToL2ETH" addonBefore="L1->L2跨链金额 ≥ " addonAfter="ETH"/>
                                    <FormItem name="L2ToL1ETH" addonBefore="L2->L1跨链金额 ≥ " addonAfter="ETH"/>
                                    <FormItem name="gasFee" addonBefore="消耗gasFee" addonAfter="ETH"/>
                                    <FormItem name="contractMin" addonBefore="不同合约数 ≥ " addonAfter="个"/>
                                    <FormItem name="totalAmount" addonBefore="总交易金额 ≥ " addonAfter="U"/>
                                </Col>
                            </Row>
                        </Card>
                    </Form>
                </Modal>
                <Spin spinning={tableLoading}>
                    <Table
                        rowSelection={rowSelection}
                        dataSource={data}
                        pagination={false}
                        bordered={true}
                        style={{marginBottom: "0px", zIndex: 2}}
                        size={"small"}
                        columns={columns}
                        scroll={{
                            y: tableHeight
                          }}
                        // sticky
                        summary={pageData => {
                            let ethBalance = 0;
                            let ethUsdcBalance = 0;
                            let ethUsdtBalance = 0;
                            let arbBalance = 0;
                            let arbUsdcBalance = 0;
                            let arbUsdtBalance = 0;
                            let zks1Balance = 0;
                            let zks2Balance = 0;
                            let zks2UsdcBalance = 0;
                            let zks2UsdtBalance = 0;
                            pageData.forEach(({
                                eth_balance,
                                eth_usdt_balance,
                                eth_usdc_balance,
                                arb_balance,
                                arb_usdt_balance,
                                arb_usdc_balance,
                                zks1_balance,
                                zks2_balance,
                                zks2_usdc_balance,
                                zks2_usdt_balance,
                            }) => {
                                ethBalance += Number(eth_balance);
                                ethUsdcBalance += Number(eth_usdc_balance);
                                ethUsdtBalance += Number(eth_usdt_balance);
                                arbBalance += Number(arb_balance);
                                arbUsdcBalance += Number(arb_usdc_balance);
                                arbUsdtBalance += Number(arb_usdt_balance);
                                zks1Balance += Number(zks1_balance);
                                zks2Balance += Number(zks2_balance);
                                zks2UsdcBalance += Number(zks2_usdc_balance);
                                zks2UsdtBalance += Number(zks2_usdt_balance);
                            })

                            return (
                                <>
                                    <Table.Summary.Row>
                                        <Table.Summary.Cell index={0} colSpan={4}>总计</Table.Summary.Cell>
                                        <Table.Summary.Cell index={4}>{ethBalance.toFixed(4)}</Table.Summary.Cell>
                                        <Table.Summary.Cell index={5}>{ethUsdcBalance.toFixed(4)}</Table.Summary.Cell>
                                        <Table.Summary.Cell index={6}>{ethUsdtBalance.toFixed(4)}</Table.Summary.Cell>
                                        <Table.Summary.Cell index={7}>{arbBalance.toFixed(4)}</Table.Summary.Cell>
                                        <Table.Summary.Cell index={8}>{arbUsdcBalance.toFixed(4)}</Table.Summary.Cell>
                                        <Table.Summary.Cell index={9}>{arbUsdtBalance.toFixed(2)}</Table.Summary.Cell>
                                        <Table.Summary.Cell index={10}>{zks1Balance.toFixed(4)}</Table.Summary.Cell>
                                        <Table.Summary.Cell index={11}/>
                                        <Table.Summary.Cell index={12}>-{zks2Balance.toFixed(0)}-</Table.Summary.Cell>
                                        <Table.Summary.Cell index={13}>-{zks2UsdcBalance.toFixed(0)}-</Table.Summary.Cell>
                                        <Table.Summary.Cell index={14}>-{zks2UsdtBalance.toFixed(0)}-</Table.Summary.Cell>
                                        <Table.Summary.Cell index={15}/>
                                    </Table.Summary.Row>
                                </>
                            )
                        }}
                        footer={() => (
                            <Card>
                                <div style={{
                                    width: '100%',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    gap: '20px'
                                }}>
                                    <Button type="primary" onClick={handleRefresh} loading={isLoading}
                                            size={"large"}
                                            style={{width: "20%"}} icon={<SyncOutlined/>}>
                                        {isLoading ? "正在刷新" : "刷新选中地址"}
                                    </Button>
                                    <Button type="primary" onClick={showModal} size={"large"} style={{width: "20%"}}
                                            icon={<PlusOutlined/>}>
                                        
                                        {isAddLoading ? "添加地址" : "正在添加地址"}
                                    </Button>
                                    <Button type="primary" onClick={showBatchModal} size={"large"}
                                            style={{width: "20%"}}
                                            icon={<UploadOutlined/>}
                                            loading={batchloading}
                                    >
                                        {batchloading ? `添加中 进度:(${batchProgress}/${batchLength})` : "批量添加地址"}
                                    </Button>
                                    <Button type="primary" onClick={() => {
                                        setIsWalletModalVisible(true)
                                    }} size={"large"} style={{width: "20%"}}
                                            icon={<SettingOutlined/>}>
                                        配置
                                    </Button>
                                    <Popconfirm title={"确认删除" + selectedKeys.length + "个地址？"}
                                                onConfirm={handleDeleteSelected}>
                                        <Button type="primary" danger size={"large"}
                                                style={{width: "20%"}} icon={<DeleteOutlined/>}>
                                            删除选中地址
                                        </Button>
                                    </Popconfirm>
                                    <Button type="primary" icon={<DownloadOutlined/>} size={"large"}
                                            style={{width: "8%"}}
                                            onClick={exportToExcelFile}/>
                                </div>
                            </Card>
                        )
                        }
                    />
                </Spin>
            </Content>
        </div>
    );
}

export default Assets;
