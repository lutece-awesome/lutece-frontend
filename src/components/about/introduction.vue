<template>
	<v-hover>
		<v-card
			slot-scope = "{ hover }"
			:class = "`elevation-${hover ? 4 : 1}`"
		>
			<v-container>
				<v-layout
					row
					wrap>
					<v-flex xs12>
						<h1 class="headline mb-3 primary--text">Introduction</h1>
						<v-divider class = "mb-3" />
						<p><b>Lutece</b>(卢特斯)是一个基于GNU General Public License Version 3协议开源的Online Judge.</p>
						<p><b>Lutece</b>的名字取自<a href = "https://en.wikipedia.org/wiki/BioShock_Infinite">BioShock Infinite</a>
							中的双胞胎科学家(事实上她们是同一个人)Robert Lutece和Rosalind Lutece的姓氏.</p>
						<p><b>Lutece</b>不仅将支持传统算法,还将计划支持并行计算和机器学习.</p>
					</v-flex>
				</v-layout>
			</v-container>
		</v-card>
	</v-hover>

</template>


<script>
export default {

};
</script>
