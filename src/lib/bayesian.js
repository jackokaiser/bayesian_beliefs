function likelihood (hyp, evidence) {
  return hyp.id in evidence.likelihood ? evidence.likelihood[hyp.id].prob : 0.0
}

function forwardBayesianStep (hypothesis, evidence, initials) {
  const hypIds = hypothesis.map(hyp => hyp.id)
  const addedHypothesisIds = Object.keys(evidence.likelihood).map(k => parseInt(k)).filter(hypId => !(hypId in hypIds))
  if (addedHypothesisIds && initials) {
    /* Some hypothesis were added right before this evidence, with provided initial probs */
    addedHypothesisIds.forEach(hypId => {
      const newHyp = initials.find(el => el.id === hypId)
      console.log('Re-adding hypothesis ', newHyp)
      hypothesis = addHypothesisWithProb(hypothesis, newHyp)
    })
  }

  var updatedHypothesis = hypothesis.map(hyp => ({
    ...hyp,
    prob: hyp.prob * likelihood(hyp, evidence)
  }))
  return normalizeHypothesis(updatedHypothesis)
}

function addHypothesisWithProb (hypothesis, newHyp) {
  var updatedHypothesis = hypothesis.map((hyp) => ({
    ...hyp,
    prob: hyp.prob * (1 - newHyp.prob)
  }))

  if (updatedHypothesis.length === 0) {
    newHyp.prob = 1.0
  }

  updatedHypothesis.push(newHyp)
  return updatedHypothesis
}

function normalizeHypothesis (hypothesis) {
  const norm = hypothesis.reduce((sum, hyp) => sum + hyp.prob, 0)
  return hypothesis.map(hyp => ({
    ...hyp,
    prob: hyp.prob / norm
  }))
}

function backwardBayesianStep (hypothesis, evidence) {
  /* Ignore hypothesis which were added after this evidence */
  const existingHypothesis = normalizeHypothesis(hypothesis.filter(hyp => hyp.id in evidence.likelihood))

  /* hyp probs divided by the marginal: ph/px */
  const previousHypothesis = existingHypothesis.map(hyp => ({
    ...hyp,
    prob: hyp.prob / likelihood(hyp, evidence)
  }))
  return normalizeHypothesis(previousHypothesis)
}

export { likelihood, forwardBayesianStep, backwardBayesianStep, addHypothesisWithProb }
