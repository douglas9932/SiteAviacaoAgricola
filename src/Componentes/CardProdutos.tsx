import React from 'react';

const CardProdutos = () => {
  return (
    <div className="grid">
      <div className="c-card c-center c-bg-opacity-1 c-content-div-5 c-grid-div">
        <h3 lang="pt" className="c-content-h3-left c-font-40 c-font-white c-font-bold c-font-uppercase c-font-white-title">LIGHTBAR</h3>
        <p lang="pt" className="c-font-white c-font-18 paragraph c-font-white-title">Alta resolução e brilho ajustável para uso externo ou interno da aeronave.</p>
        <div>
          <a id="folderLightBar" lang="pt" href="assets/base/catalogos/catalogo_lightbar/PORTUGUÊS/lightbar_interno_e_externo_2021.pdf" className="c-action-btn btn btn-lg c-btn-square c-theme-btn c-btn-bold c-btn-uppercase" target="_blank">CATÁLOGO</a><span className="badge">Novo</span>
          <a id="lightbarImg" lang="pt" className="c-action-btn btn btn-lg c-btn-square c-theme-btn c-btn-bold c-btn-uppercase" href="#prodLightbar">EXTERNO</a>
          <a id="lightbarIntImg" lang="pt" className="c-action-btn btn btn-lg c-btn-square c-theme-btn c-btn-bold c-btn-uppercase" href="#prodLightbarInt">INTERNO</a>
        </div>
      </div>
    </div>
  );
}

export default CardProdutos;