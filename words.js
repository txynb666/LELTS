(function(root){
const topics={environment:'环境与可持续发展',education:'教育与成长',technology:'科技与创新',society:'社会与公共政策'};
// Original practice material. Difficulty is indicative, not an official IELTS band classification.
const rows=[
['mitigate','/ˈmɪtɪɡeɪt/','v.','减轻；缓解','mitigate climate change','Governments should invest in renewable energy to mitigate climate change.','alleviate','exacerbate','environment'],
['degradation','/ˌdeɡrəˈdeɪʃən/','n.','退化；恶化','environmental degradation','Unregulated industrial development can accelerate environmental degradation.','deterioration','restoration','environment'],
['sustainable','/səˈsteɪnəbəl/','adj.','可持续的','sustainable development','Sustainable development requires a balance between economic growth and environmental protection.','viable','unsustainable','environment'],
['depletion','/dɪˈpliːʃən/','n.','消耗；枯竭','resource depletion','Excessive consumption contributes to resource depletion and threatens future prosperity.','exhaustion','replenishment','environment'],
['biodiversity','/ˌbaɪəʊdaɪˈvɜːsəti/','n.','生物多样性','biodiversity conservation','Biodiversity conservation should be a priority when governments formulate land-use policies.','biological diversity','','environment'],
['emissions','/ɪˈmɪʃənz/','n. plural','排放物；排放量','curb carbon emissions','Expanding public transport is an effective way to curb carbon emissions in urban areas.','discharges','','environment'],
['detrimental','/ˌdetrɪˈmentəl/','adj.','有害的；不利的','detrimental effects','Intensive farming can have detrimental effects on soil quality and nearby ecosystems.','harmful','beneficial','environment'],
['conservation','/ˌkɒnsəˈveɪʃən/','n.','保护；节约','wildlife conservation','Greater funding for wildlife conservation could help protect endangered species.','preservation','destruction','environment'],
['resilience','/rɪˈzɪliəns/','n.','恢复力；适应力','ecosystem resilience','Restoring wetlands can strengthen ecosystem resilience to extreme weather events.','adaptability','vulnerability','environment'],
['exacerbate','/ɪɡˈzæsəbeɪt/','v.','加剧；使恶化','exacerbate water scarcity','Inefficient irrigation practices may exacerbate water scarcity in agricultural regions.','aggravate','alleviate','environment'],
['renewable','/rɪˈnjuːəbəl/','adj.','可再生的','renewable energy sources','Subsidies can encourage businesses to switch from fossil fuels to renewable energy sources.','replenishable','non-renewable','environment'],
['contamination','/kənˌtæmɪˈneɪʃən/','n.','污染；受到污染','groundwater contamination','Stricter controls on industrial waste are necessary to prevent groundwater contamination.','pollution','purification','environment'],
['ecological','/ˌiːkəˈlɒdʒɪkəl/','adj.','生态的；生态学的','ecological balance','The removal of native predators can disrupt the ecological balance of an entire region.','environmental','','environment'],
['rehabilitation','/ˌriːəˌbɪlɪˈteɪʃən/','n.','修复；恢复','land rehabilitation','Mining companies should bear the cost of land rehabilitation after extraction ends.','restoration','degradation','environment'],
['scarcity','/ˈskeəsəti/','n.','短缺；匮乏','water scarcity','Water scarcity may force governments to impose restrictions on agricultural consumption.','shortage','abundance','environment'],
['curriculum','/kəˈrɪkjələm/','n.','课程；课程体系','a balanced curriculum','A balanced curriculum should give students opportunities to develop both academic and practical skills.','course of study','','education'],
['attainment','/əˈteɪnmənt/','n.','成就；达到','educational attainment','Family income should not determine the level of educational attainment a child can reach.','achievement','','education'],
['autonomy','/ɔːˈtɒnəmi/','n.','自主权；自主性','learner autonomy','Project-based learning can promote learner autonomy by allowing students to make meaningful decisions.','independence','dependence','education'],
['literacy','/ˈlɪtərəsi/','n.','读写能力；素养','digital literacy','Digital literacy enables students to assess the reliability of information they encounter online.','competence','illiteracy','education'],
['equitable','/ˈekwɪtəbəl/','adj.','公平的；公正的','equitable access to education','Public funding is essential to ensure equitable access to education in rural communities.','fair','inequitable','education'],
['pedagogical','/ˌpedəˈɡɒdʒɪkəl/','adj.','教学的；教育学的','pedagogical approaches','Teachers need ongoing training to evaluate new pedagogical approaches critically.','educational','','education'],
['foster','/ˈfɒstə/','v.','培养；促进','foster critical thinking','Open discussion can foster critical thinking by exposing students to competing interpretations.','encourage','inhibit','education'],
['proficiency','/prəˈfɪʃənsi/','n.','熟练；精通','language proficiency','Regular exposure to authentic texts can improve language proficiency over time.','competence','incompetence','education'],
['innovation','/ˌɪnəˈveɪʃən/','n.','创新','technological innovation','Technological innovation can improve productivity when workers receive adequate training.','invention','stagnation','technology'],
['automation','/ˌɔːtəˈmeɪʃən/','n.','自动化','industrial automation','Industrial automation may replace routine tasks while creating demand for new technical skills.','mechanisation','','technology'],
['obsolete','/ˈɒbsəliːt/','adj.','过时的；淘汰的','render equipment obsolete','Rapid advances in computing can render expensive equipment obsolete within a few years.','outdated','current','technology'],
['infrastructure','/ˈɪnfrəˌstrʌktʃə/','n.','基础设施','digital infrastructure','Reliable digital infrastructure is necessary for businesses to operate in remote regions.','basic systems','','technology'],
['surveillance','/səˈveɪləns/','n.','监视；监控','mass surveillance','Mass surveillance raises difficult questions about the balance between security and privacy.','monitoring','','technology'],
['accessible','/əkˈsesəbəl/','adj.','可获得的；易使用的','accessible technology','Accessible technology can help people with disabilities participate more fully in education.','available','inaccessible','technology'],
['disseminate','/dɪˈsemɪneɪt/','v.','传播；散布','disseminate information','Social media allows organisations to disseminate information rapidly during emergencies.','spread','withhold','technology'],
['disparity','/dɪˈspærəti/','n.','差距；不平等','income disparity','Progressive taxation may help reduce income disparity without eliminating incentives to work.','inequality','parity','society'],
['cohesion','/kəʊˈhiːʒən/','n.','凝聚力；团结','social cohesion','Shared public spaces can strengthen social cohesion by encouraging everyday interaction.','unity','division','society'],
['urbanisation','/ˌɜːbənaɪˈzeɪʃən/','n.','城市化','rapid urbanisation','Rapid urbanisation places considerable pressure on housing and public transport.','urban growth','ruralisation','society'],
['demographic','/ˌdeməˈɡræfɪk/','adj.','人口统计的','demographic change','Demographic change requires governments to reconsider how they fund pensions and healthcare.','population-related','','society'],
['marginalised','/ˈmɑːdʒɪnəlaɪzd/','adj.','被边缘化的','marginalised communities','Local authorities should consult marginalised communities before redesigning essential services.','excluded','included','society'],
['accountability','/əˌkaʊntəˈbɪləti/','n.','问责；责任','public accountability','Transparent spending records can improve public accountability and increase trust in institutions.','answerability','unaccountability','society'],
['allocate','/ˈæləkeɪt/','v.','分配；拨给','allocate public funds','Governments must allocate public funds carefully when demand for essential services rises.','assign','withhold','society'],
['incentive','/ɪnˈsentɪv/','n.','激励；刺激因素','financial incentives','Financial incentives can encourage households to install insulation and reduce energy consumption.','motivation','disincentive','society'],
['affluent','/ˈæfluənt/','adj.','富裕的','affluent households','Affluent households often have greater access to private educational resources.','wealthy','impoverished','society'],
['viable','/ˈvaɪəbəl/','adj.','可行的','a viable alternative','Affordable public transport must be a viable alternative before cities restrict private cars.','feasible','unworkable','society']
];
const words=rows.map(([word,ipa,pos,zh,collocation,example,synonym,antonym,topic])=>({id:word,word,ipa,pos,zh,collocation,example,synonym,antonym,topic}));
const prompts={environment:'Some people believe environmental problems should be solved by governments, while others argue that individuals have a greater responsibility. Discuss both views and give your opinion.',education:'Some people argue that universities should focus on job-related skills, while others believe they should provide a broader education. Discuss both views and give your opinion.',technology:'The increasing use of automation is changing the workplace. Do the advantages of this development outweigh the disadvantages?',society:'Governments should invest more in public transport than in building new roads. To what extent do you agree or disagree?'};
const api={words,topics,prompts};if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.IELTSData=api;
})(typeof globalThis!=='undefined'?globalThis:this);
