with open('src/App.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

replacements = {
    # Project 1
    '''<p><strong>C3NLP 2023:</strong> Measurements of fairness in NLP often perpetuate a Western narrative. To address this, we leverage community engagement and generative models to build a benchmark targeting stereotyping harms across diverse and intersectional identities.</p>
                          <p><strong>NeurIPS 2023:</strong> Current evaluation paradigms underrepresent local socio-cultural perspectives. We demonstrate a socio-culturally aware expansion of evaluation resources in the Indian societal context, generating over 1000 stereotypes across unique identities to better calibrate LLM evaluations.</p>
                          <p><strong>Methodological Impact:</strong> Our collaborative methodology combined deep community engagement with generative AI capabilities to identify and mitigate bias in AI models. This comprehensive approach ensured that the AI evaluation frameworks are not just technically sound, but also deeply grounded in the nuanced socio-cultural realities of underrepresented populations, setting a new global standard for responsible AI metrics.</p>''':
    '''<p><strong>C3NLP & NeurIPS 2023:</strong> We leveraged community engagement and generative models to build benchmarks targeting stereotyping harms across diverse intersectional identities, expanding evaluation resources for the Indian societal context to better calibrate LLMs.</p>
                          <p><strong>Impact:</strong> Our methodology grounded AI evaluation frameworks in nuanced socio-cultural realities, setting a new standard for responsible AI metrics.</p>''',
    
    # Project 2
    '''<p>This initiative focused on the structural formalization of a complex hybrid GeoAI workflow. The primary objective was to translate multi-layered geospatial data processes into a rigorous mathematical constrained optimization model.</p>
                          <p>By bridging the gap between traditional geospatial analysis, advanced mathematical formalism, and cutting-edge machine learning techniques, we enabled the client to establish a robust, scalable foundation for future GeoAI applications. This innovative approach significantly improved algorithmic efficiency, resource allocation, and spatial prediction reliability across diverse environmental datasets.</p>''':
    '''<p>We translated multi-layered geospatial data processes into a rigorous mathematical constrained optimization model, formalizing a complex hybrid GeoAI workflow.</p>
                          <p>This bridged traditional geospatial analysis with cutting-edge machine learning, establishing a scalable foundation that significantly improved algorithmic efficiency and spatial prediction reliability.</p>''',

    # Project 3
    '''<p>Our team provided critical independent validation for a newly proposed AI governance framework. Utilizing the rigorous Design Science Research (DSR) methodology, we systematically reviewed the ethical dimensions, theoretical soundness, and practical applicability of the framework.</p>
                          <p>We conducted comprehensive impact assessments and stakeholder analyses to ensure that the governance protocols were not only theoretically robust but also actionable. The project ultimately delivered a highly practical blueprint for responsible AI deployment in high-stakes environments, minimizing regulatory risks while maximizing societal benefit.</p>''':
    '''<p>We provided independent validation for a proposed AI governance framework using the Design Science Research (DSR) methodology, reviewing its ethical dimensions, theoretical soundness, and practical applicability.</p>
                          <p>Through comprehensive impact assessments, we delivered a highly practical blueprint for responsible AI deployment in high-stakes environments, minimizing regulatory risks while maximizing societal benefit.</p>''',

    # Project 4
    '''<p>Serving as lead statistical consultants, we conducted an in-depth analysis of comprehensive electric vehicle (EV) market datasets provided by S&P Global Mobility Access. Our work encompassed advanced data modeling, trend forecasting, and interpretative analysis to uncover nuanced shifts in EV adoption rates globally.</p>
                          <p>The insights generated from our rigorous statistical modeling empowered key industry stakeholders to make data-driven decisions regarding market entry, infrastructure investment, and long-term strategic positioning within the rapidly evolving automotive landscape.</p>''':
    '''<p>As lead statistical consultants, we analyzed comprehensive EV market datasets to uncover nuanced shifts in global adoption rates using advanced data modeling and trend forecasting.</p>
                          <p>Our rigorous statistical modeling empowered industry stakeholders to make data-driven decisions regarding market entry and infrastructure investment in the rapidly evolving automotive landscape.</p>''',

    # Project 5
    '''<p>This project required the systematic identification, critical appraisal, and synthesis of high-quality scholarly and peer-reviewed literature concerning healthcare best practices. Our rigorous methodology ensured that only the most robust, verifiable evidence was curated and integrated into the final analysis.</p>
                          <p>The resulting comprehensive literature review and evidence base provided actionable insights that directly informed clinical guidelines, public health AI development, and hospital operational improvements, successfully bridging the critical gap between academic research and practical healthcare delivery.</p>''':
    '''<p>We systematically identified and critically appraised high-quality scholarly literature concerning healthcare best practices, ensuring only the most robust evidence was integrated into our analysis.</p>
                          <p>This comprehensive evidence base informed clinical guidelines and public health AI development, successfully bridging the gap between academic research and practical healthcare delivery.</p>''',

    # Project 6
    '''<p>We conducted an extensive mixed-methods research study investigating the socioeconomic impact of digital financial product adoption on women's autonomy. The project integrated a thorough, multi-disciplinary literature review with rigorous qualitative and quantitative primary data analysis.</p>
                          <p>By examining the intersection of digital finance and gender dynamics, we successfully identified key structural barriers and socio-cultural enablers of financial independence. Our findings culminated in a comprehensive report framing actionable AI implications designed to drive meaningful gender mainstreaming in future development initiatives.</p>''':
    '''<p>We investigated the socioeconomic impact of digital financial product adoption on women's autonomy through an extensive mixed-methods study integrating multi-disciplinary literature review with primary data analysis.</p>
                          <p>Our findings identified key structural barriers and culminated in a report framing actionable AI implications to drive meaningful gender mainstreaming in future development initiatives.</p>''',

    # Project 7
    '''<p>Our experts conducted an in-depth, pre-peer review evaluation of a dense, highly interdisciplinary AI theory program spanning epistemology, cognitive science, and formal logic. We meticulously analyzed the formal claims, stability arguments, operator semantics, and the underlying empirical design.</p>
                          <p>By providing structured, rigorous academic feedback and constructive methodological recommendations, we ensured the theoretical framework met the absolute highest standards of academic excellence prior to its submission for formal peer review at top-tier international journals.</p>''':
    '''<p>Our experts conducted an in-depth, pre-peer review evaluation of a highly interdisciplinary AI theory program spanning epistemology, cognitive science, and formal logic.</p>
                          <p>By providing structured academic feedback and methodological recommendations, we ensured the theoretical framework met the highest standards of excellence prior to submission at top-tier international journals.</p>''',

    # Project 8
    '''<p>Leveraging advanced Social Network Analysis (SNA) techniques, we mapped and analyzed the complex relational structures among key individuals associated with county government operations. The project involved identifying influential clusters, central nodes, and hidden influence patterns within the institutional network.</p>
                          <p>These critical insights revealed underlying governance dynamics and informal power structures, providing government stakeholders with a clear, data-driven understanding of communication flows, operational bottlenecks, and opportunities for structural reform.</p>''':
    '''<p>Leveraging advanced Social Network Analysis (SNA), we mapped the complex relational structures among key individuals in county government to identify influential clusters and hidden influence patterns.</p>
                          <p>These insights revealed underlying governance dynamics, providing stakeholders with a data-driven understanding of communication flows and opportunities for structural reform.</p>''',

    # Project 9
    '''<p>We executed a comprehensive strategic research initiative focused on contemporary international relations and global AI landscapes. The project involved a deep-dive analysis into cross-border institutional dynamics, geopolitical shifts, and emerging global macroeconomic trends.</p>
                          <p>The rigorous synthesis of these complex factors culminated in the delivery of highly tailored, strategic recommendations. This vital intelligence directly aligned with and advanced the client's international mission, enabling them to navigate complex diplomatic environments with confidence and foresight.</p>''':
    '''<p>We executed a strategic research initiative analyzing cross-border institutional dynamics, geopolitical shifts, and emerging global macroeconomic trends within contemporary international relations and global AI landscapes.</p>
                          <p>The rigorous synthesis of these factors culminated in highly tailored recommendations, enabling the client to navigate complex diplomatic environments with confidence and foresight.</p>''',

    # Project 10
    '''<p>Operating in a co-founder capacity, we spearheaded the foundational market research and comprehensive business development strategy for CryoCorp O2 LLP. This multifaceted role involved developing a robust procurement strategy—specifically navigating the complex GEM portal—and leading intensive investor outreach initiatives.</p>
                          <p>Furthermore, we designed and executed an aggressive go-to-market strategy aimed at successfully deploying industrial oxygen plants across diverse, high-need markets in India and East Africa, securing vital early-stage partnerships and funding.</p>''':
    '''<p>In a co-founder capacity, we spearheaded foundational market research and business development for CryoCorp O2 LLP, navigating procurement strategies and leading intensive investor outreach.</p>
                          <p>We designed and executed an aggressive go-to-market strategy to deploy industrial oxygen plants across high-need markets in India and East Africa, securing vital early-stage partnerships.</p>'''
}

changes_made = 0
for old_text, new_text in replacements.items():
    if old_text in content:
        content = content.replace(old_text, new_text)
        changes_made += 1
    else:
        print(f"COULD NOT FIND: {old_text[:50]}...")

if changes_made > 0:
    with open('src/App.jsx', 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Successfully shortened {changes_made} project descriptions.")
else:
    print("No changes were made.")
